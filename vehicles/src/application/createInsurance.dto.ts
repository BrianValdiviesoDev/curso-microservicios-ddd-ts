
export class CreateInsuranceDTO {
	constructor(
        public startDate: Date,
        public endDate: Date,
        public amount: number,
        public company: string,
	) {}
}
