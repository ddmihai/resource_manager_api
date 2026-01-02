import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRouter from './modules';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import ressourceRouter from './modules/resource/routes/resources.routes';
import cookieParser from 'cookie-parser';
import userRouter from './modules/users/routes/user.routes';
import companyRouter from './modules/company/routes/index.routes';
import storageRouter from './modules/storage/routes/storage.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
const app = express();


app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5174", // exact frontend origin
    credentials: true,               // allow cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);
app.use('/api/v1/resources', ressourceRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/storage', storageRouter);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;
