import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/User.service';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: IUser = req.body;

        // check if user exists
        let user = await UserService.FindUserByEmail(email);
        if (!user) {
            return res.status(403).json({
                status: 'error',
                message: 'Invalid credentials.'
            })
        };

        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                status: 'error',
                message: 'Invalid credentials.'
            })
        };


        // generate token
        const token = jwt.sign({
            _id: user._id,
            role: user.role,
            email: user.email
        },
            env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

        // setup the cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            status: 'success',
            message: 'Login successful.'
        });
    }

    catch (error) {
        logger.error('Error in loginController:', error);
        next(error);
    }
};