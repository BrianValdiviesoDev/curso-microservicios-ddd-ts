import { Family } from './family.entity';

export interface FamilyDbPort {
    create(family: Family): Promise<Family>;
    findById(familyId: string): Promise<Family>;
}