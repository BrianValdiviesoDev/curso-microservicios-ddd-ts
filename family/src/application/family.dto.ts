export class FamilyDto {
	constructor(
    public familyId:string,
    public name: string,
    public members?: string[],
    public vehicles?: string[]
	) {}
}
