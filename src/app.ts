import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRouter from './modules';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import ressourceRouter from './modules/resource/routes/resources.routes';

const app = express();


app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);
app.use('/api/v1/resources', ressourceRouter);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;
