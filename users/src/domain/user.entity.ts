
import { v6 as uuidv6 } from 'uuid';
import { IUser, LicenseType, Rol } from './user.interface';
import { ValidationError } from '../errors/errorfactory';


  
export class User implements IUser {
	public readonly userId: string;
	public name: string;
	public email: string;
	public birth_date?: Date;
	public rol: Rol[];
	public car_license?: LicenseType;
  
	constructor(
		name: string,
		email: string,
		rol: Rol[],
		id?:string,
		birth_date?: Date,
		car_license?: LicenseType
	) {
		this.userId = userId(id);
		this.name = name;
		this.email = email;
		this.birth_date = birth_date;
		this.rol = rol;
		this.car_license = car_license;
  
		// Validación de dominio
		this.validate();
	}
  
	// Aquí se implementan las reglas de validación del dominio
	private validate() {
		// Validación del correo electrónico
		if (!this.isValidEmail(this.email)) {
			throw new ValidationError(`El correo electrónico ${this.email} no es válido.`);
		}
  
		// Validación de los roles (puedes agregar más validaciones según tu necesidad)
		if (!this.rol || this.rol.length === 0) {
			throw new ValidationError('El usuario debe tener al menos un rol.');
		}
	}
  
	// Método para validar el formato de correo electrónico
	private isValidEmail(email: string): boolean {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return emailRegex.test(email);
	}
}

const userId = (id?:string):string => {
	return id || uuidv6();
};