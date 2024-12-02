import { Vehicle } from '../domain/vehicle.entity';
import { CreateVehicleDTO } from './createVehicle.dto';
import { VehicleDto } from './vehicle.dto';

export class VehicleMapper {
	static toDomain(dto: CreateVehicleDTO): Vehicle {
		return new Vehicle(
			dto.licensePlate,
			dto.brand,
			dto.model,
			dto.kilometers,
		);
	}

	static toDto(vehicle: Vehicle): VehicleDto {
		return new VehicleDto(
			vehicle.vehicleId,
			vehicle.brand,
			vehicle.model,
			vehicle.licensePlate,
			vehicle.kilometers,
			vehicle.insurances,
			vehicle.itv,
			vehicle.checkups,
		);
	}
}
