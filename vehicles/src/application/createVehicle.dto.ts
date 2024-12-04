
export class CreateVehicleDTO {
	constructor(
        public licensePlate: string,
        public brand: string,
        public model: string,
        public kilometers: number
	) {}
}
