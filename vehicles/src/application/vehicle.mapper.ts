import { Insurance } from '../domain/insurance.entity';
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

	static fromInfra(vehicle: VehicleDto): Vehicle {
		const insurances = vehicle.insurances?.map((insurance) => {
			return new Insurance(
				insurance.startDate,
				insurance.endDate,
				insurance.amount,
				insurance.company,
				insurance.insuranceId,
			);
		});
		return new Vehicle(
			vehicle.licensePlate,
			vehicle.brand,
			vehicle.model,
			vehicle.kilometers,
			insurances,
			vehicle.itv,
			vehicle.checkups,
			vehicle.vehicleId,
		);
	}
}
