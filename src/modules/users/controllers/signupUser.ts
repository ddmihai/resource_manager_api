import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/User.service';



export const signupController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, fullName, role }: IUser = req.body;




        if (role === 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Admin account creation is not allowed through this endpoint.'
            });
        }

        const newUser = await UserService.CreateUser({
            email: email.toLowerCase().trim(),
            password: password.trim(),
            fullName: fullName.trim().toLowerCase(),
            role
        });

        console.log('New user created:', newUser);

        return res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    }

    catch (error) {
        logger.error('Error in loginController:', error);
        next(error);
    }
};