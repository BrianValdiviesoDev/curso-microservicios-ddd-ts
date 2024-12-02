import express from 'express';
import { Request, Response } from 'express';
import expressConfig from './framework/express';
import { ErrorHandler } from './framework/middlewares/errorHandler';
import VehicleRouter from './routes/vehicle.routes';
import InsuranceRouter from './routes/insurance.routes';

const app = express();
expressConfig(app);

app.use(express.json());

// Ruta de checking
app.get('/monit/health', (req: Request, res: Response) => {
	res.send('Healthy');
});

app.use('/', VehicleRouter);
app.use('/insurance', InsuranceRouter);

app.use(ErrorHandler.handle);

export { app };