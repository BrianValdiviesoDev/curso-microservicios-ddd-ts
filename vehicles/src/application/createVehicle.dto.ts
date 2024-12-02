
export class CreateVehicleDTO {
	constructor(
    public brand: string,
    public model: string,
    public licensePlate: string,
    public kilometers: number
	) {}
}
