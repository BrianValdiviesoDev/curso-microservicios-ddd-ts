import express from 'express';
import { Request, Response } from 'express';
import expressConfig from './framework/express';
import { errorHandler } from './framework/middlewares/errorHandler';
import UserRouter from './routes/user.routes';

const app = express();
expressConfig(app);

app.use(express.json());

// Ruta de checking
app.get('/monit/health', (req: Request, res: Response) => {
	res.send('Healthy');
});

app.use('/users', UserRouter);

app.use(errorHandler);

export { app };