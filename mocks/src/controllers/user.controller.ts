import { NextFunction, Request, Response } from 'express';


const createUser = async (req: Request, res: Response, next: NextFunction) => {
	next();
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	next();
};


const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	next();
};

const listUsers = async (req: Request, res: Response, next: NextFunction) => {
	next();
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
	next();
};



export {
	createUser,
	updateUser,
	deleteUser,
	listUsers,
	getUser,
};