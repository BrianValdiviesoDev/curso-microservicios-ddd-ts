import { Insurance } from './insurance.entity';

export interface InsuranceDbPort {
    create(insurance: Insurance): Promise<Insurance>;
}