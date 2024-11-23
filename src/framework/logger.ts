// src/logger.ts
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, errors, colorize } = format;

// Formato personalizado para los logs
const customFormat = printf(({ level, message, timestamp, stack }) => {
	return `${timestamp} [${level}]: ${stack || message}`;
});

// Crear el logger con Winston
const logger = createLogger({
	format: combine(
		timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		errors({ stack: true }), // Maneja errores con stack traces
		colorize({all:true}),
		customFormat
	),
	transports: [
		new transports.Console(), // Mostrar logs en la consola
		new transports.File({ filename: 'logs/error.log', level: 'error' }), // Errores
		new transports.File({ filename: 'logs/combined.log' }), // Logs generales
	],
	level: process.env.NODE_ENV === 'dev' ? 'debug' : 'info', // Nivel por defecto según el entorno
});

export default logger;