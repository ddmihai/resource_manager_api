// src/middleware/authGuard.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../../../middleware/errorHandler";
import { env } from "../../../config/env";
import { UserService } from "../../users/services/User.service";


type AccessTokenPayload = {
    _id: string;
    role: "admin" | "user";
    email: string;
};

export async function authGuard(req: Request, _res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            throw new ApiError("Unauthorized", 401);
        }

        const decoded = jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET) as JwtPayload;

        // basic shape check
        const { _id, role, email } = decoded as unknown as AccessTokenPayload;
        if (!_id || !role || !email) {
            throw new ApiError("Invalid token payload", 401);
        }

        // check if the user exists
        const existingUser = await UserService.FindUserById(_id);
        if (!existingUser) {
            throw new ApiError("User not found", 401);
        }
        req.user = { _id, role, email };
        return next();
    }
    catch (err) {
        return next(new ApiError("Unauthorized", 401));
    }
}
