// src/types/express.d.ts  (or src/@types/express/index.d.ts)
import type { Types } from "mongoose";

declare global {
    namespace Express {
        interface UserPayload {
            _id: string; // store as string for simplicity
            role: "admin" | "user";
            email: string;
        }

        interface Request {
            user?: UserPayload;
        }
    }
}

export { };
