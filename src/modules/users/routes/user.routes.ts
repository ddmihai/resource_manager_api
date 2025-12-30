import { Router } from 'express';
import { signupController } from '../controllers/signupUser';
import { rateLimiters } from '../../../middleware/rateLimiter';
import { loginController } from '../controllers/loginUser';



const userRouter = Router();


userRouter.post('/signup', rateLimiters.auth, signupController);
userRouter.post('/login', rateLimiters.auth, loginController);




export default userRouter;