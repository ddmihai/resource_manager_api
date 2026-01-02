import { Router } from 'express';
import { signupController } from '../controllers/signupUser';
import { rateLimiters } from '../../../middleware/rateLimiter';
import { loginController } from '../controllers/loginUser';
import { getMe } from '../controllers/getMe';
import { authGuard } from '../../auth/middleware/loginGuard.middleware';



const userRouter = Router();


userRouter.post('/signup', rateLimiters.auth, signupController);
userRouter.post('/login', rateLimiters.auth, loginController);
userRouter.get('/getMe', rateLimiters.auth, authGuard, getMe);




export default userRouter;