import { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import logger from './logger';
import swaggerUi from 'swagger-ui-express';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const saggerDoc = require('./swagger.json');

export default function expressConfig(app: Express) {
	const corsOptions = {
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		origin:['*']
	};
	app.use(cors(corsOptions));

	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(
		bodyParser.urlencoded({
			limit: '50mb',
			extended: true,
			parameterLimit: 50000,
		})
	);

	app.use((req, res, next) => {
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, OPTIONS, PUT, DELETE'
		);
		res.setHeader(
			'Access-Control-Allow-Headers',
			'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
		);
		next();
	});
    
	// Configurar Morgan para registrar peticiones en Winston
	app.use(
		morgan(':method :url :status (:response-time ms)', {
			stream: {
				write: (message: string) => logger.info(message.trim()),
			},
		})
	);

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(saggerDoc));
}