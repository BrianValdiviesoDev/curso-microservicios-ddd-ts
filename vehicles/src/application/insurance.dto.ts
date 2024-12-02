
export class InsuranceDto {
	constructor(
    public insuranceId:string,
    public startDate: Date,
    public endDate: Date,
    public amount: number,
    public company: string,
	) {}
}
