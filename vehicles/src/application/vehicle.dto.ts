
export class VehicleDto {
	constructor(
    public vehicleId:string,
    public brand: string,
    public model: string,
    public licensePlate: string,
    public kilometers: number,
    public insurances?: string[],
    public itv?: string[],
    public checkups?: string[],
	) {}
}
