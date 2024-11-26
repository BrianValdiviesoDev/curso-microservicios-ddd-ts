import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { NotFoundError } from '../errors/errorfactory';
import logger from '../framework/logger';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userMicroUrl = process.env.USERS_MICRO;
		const uri = `${userMicroUrl}/`;
		const response = await fetch(uri, {
			headers: {
				'Content-Type': 'application/json',
			  },
			method: 'POST',
			body: JSON.stringify(req.body),
		});
		if (response.status == 201) {
			const json = await response.json();
			res.status(201).send(json);
			return;
		}
		logger.error(`users-micro response ${response.status}`);
		const text = await response.text();
		res.status(response.status).send(text);	
		return;
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