import 'dotenv/config';
import express from 'express';
import { Request, Response } from 'express';
import expressConfig from './framework/express';
import { errorHandler } from './framework/middlewares/errorHandler';
import userRouter from './routes/user.routes';
import familyRouter from './routes/family.routes';
import vehicleRouter from './routes/vehicle.routes';

const app = express();
expressConfig(app);

app.use(express.json());

// Ruta de checking
app.get('/monit/health', (req: Request, res: Response) => {
	res.send('Healthy');
});


app.use('/users', userRouter);
app.use('/families', familyRouter);
app.use('/vehicles', vehicleRouter);

app.use(errorHandler);

export { app };