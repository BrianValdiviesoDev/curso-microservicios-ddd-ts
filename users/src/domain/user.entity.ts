
import { v6 as uuidv6 } from 'uuid';
import { IUser, LicenseType, Rol } from './user.interface';


  
export class User implements IUser {
	public readonly id: string;
	public name: string;
	public email: string;
	public birth_date?: Date;
	public rol: Rol[];
	public car_license?: LicenseType;
  
	constructor(
		name: string,
		email: string,
		rol: Rol[],
		birth_date?: Date,
		car_license?: LicenseType
	) {
		this.id = userId();
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
			throw new Error('El correo electrónico no es válido.');
		}
  
		// Validación de los roles (puedes agregar más validaciones según tu necesidad)
		if (!this.rol || this.rol.length === 0) {
			throw new Error('El usuario debe tener al menos un rol.');
		}
	}
  
	// Método para validar el formato de correo electrónico
	private isValidEmail(email: string): boolean {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return emailRegex.test(email);
	}
}

const userId = ():string => {
	return uuidv6();
};