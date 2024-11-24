import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { BadRequestError, NotFoundError } from '../errors/errorfactory';


const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.body.email || !req.body.name) {
			throw new BadRequestError('Name and email are required');
		}
		const userService = new UserService();
		const newUser = await userService.createUser(req.body);
		if (!newUser) {
			throw new Error('Error creating user');
		}
		res.status(201).send(newUser);
	} catch (e) {
		next(e);
	}
    

};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userService = new UserService();
		const updated = await userService.updateUser(
			req.params.id,
			req.body.user,
		);
		if (!updated) {
			throw new NotFoundError('User not found');
		}
		res.status(200).send(updated);
	} catch (e) {
		next(e);
	}

};


const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userService = new UserService();
		const deleted = await userService.deleteUser(req.params.id);
		if (deleted.deletedCount < 1) {
			throw new NotFoundError('User not found');
		}
		res.status(200).send();
	} catch (e) {
		next(e);
	}
		

};

const listUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userService = new UserService();
		const users = await userService.listUsers();
		if (users.length < 1) {
			throw new NotFoundError('Users not found');
		}
		res.status(200).send(users);        
	} catch (e) {
		next(e);
	}
    

};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userService = new UserService();
		const user = await userService.getUser(req.params.id);
		if (!user) {
			throw new NotFoundError('User not found');
		}
		res.status(200).send(user);
	} catch (e) {
		next(e);
	}    
};



export {
	createUser,
	updateUser,
	deleteUser,
	listUsers,
	getUser,
};