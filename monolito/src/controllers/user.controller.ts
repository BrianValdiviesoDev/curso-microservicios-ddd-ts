import { NextFunction, Request, Response } from 'express';
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
		const userMicroUrl = process.env.USERS_MICRO;
		const uri = `${userMicroUrl}/${req.params.id}`;
		const response = await fetch(uri, {
			headers: {
				'Content-Type': 'application/json',
			  },
			method: 'PUT',
			body: JSON.stringify(req.body),
		});
		if (response.status == 200) {
			const json = await response.json();
			res.status(200).send(json);
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


const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userMicroUrl = process.env.USERS_MICRO;
		const uri = `${userMicroUrl}/${req.params.id}`;
		const response = await fetch(uri, {
			headers: {
				'Content-Type': 'application/json',
			  },
			method: 'DELETE',
			body: JSON.stringify(req.body),
		});
		if (response.status == 200) {
			const json = await response.json();
			res.status(200).send(json);
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

const listUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userMicroUrl = process.env.USERS_MICRO;
		const uri = `${userMicroUrl}/`;
		const response = await fetch(uri, {
			method: 'GET',
		});
		if (response.status == 200) {
			const json = await response.json();
			res.status(200).send(json);
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

const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userMicroUrl = process.env.USERS_MICRO;
		const uri = `${userMicroUrl}/${req.params.id}`;
		const response = await fetch(uri, {
			method: 'GET',
		});
		if (response.status == 200) {
			const json = await response.json();
			res.status(200).send(json);
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



export {
	createUser,
	updateUser,
	deleteUser,
	listUsers,
	getUser,
};