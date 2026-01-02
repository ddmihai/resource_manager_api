import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { UserService } from '../services/User.service';



export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get the user from the req obj
        const userId = (req as any).user;

        // validate user to exist in database
        const exsitingUser = await UserService.FindUserById(userId._id);

        return res.status(200).json({
            success: true,
            exsitingUser
        })
    }

    catch (error) {
        logger.error('Error in get me controller', error);
        next(error);
    }
}