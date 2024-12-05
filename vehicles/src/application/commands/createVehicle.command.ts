import { Insurance } from '../../domain/insurance.entity';

export class CreateVehicleCommand {
	constructor(
		public readonly licensePlate: string,
		public readonly brand: string,
		public readonly model: string,
		public readonly kilometers: number,
		public readonly insurances?: Insurance[],
		public readonly itv?: string[] | undefined,
		public readonly checkups?: string[] | undefined,
		public readonly id?: string
	) { }
}