import express from 'express';
import { Request, Response } from 'express';
import expressConfig from './framework/express';
import { ErrorHandler } from './framework/middlewares/errorHandler';
import FamilyRoutes from './routes/family.routes';

const app = express();
expressConfig(app);

app.use(express.json());

// Ruta de checking
app.get('/monit/health', (req: Request, res: Response) => {
	res.send('Healthy');
});

app.use('/', FamilyRoutes);

app.use(ErrorHandler.handle);

export { app };