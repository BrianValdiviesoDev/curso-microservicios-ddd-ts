import { v6 as uuidv6 } from 'uuid';

import { IInsurance } from './insurance.interface';

export class Insurance implements IInsurance{
	public readonly insuranceId: string;
	public startDate: Date;
	public endDate: Date;
	public amount: number;
	public company: string;
    
	constructor(
		startDate: Date,
		endDate: Date,
		amount: number,
		company: string,
		id?:string,
	) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.amount = amount;
		this.company = company;
		this.insuranceId = id || this.generateInsuranceId();
	}
    
	private generateInsuranceId = () : string=>{
		return this.insuranceId || uuidv6(); 
	};
}