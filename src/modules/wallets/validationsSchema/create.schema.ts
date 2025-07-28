export const createBodySchema = {
	name: ["required", "alpha", "min:3", "max:50"],
	account_type_id: ["required", "numeric"],
	currency_id: ["required", "numeric"],
};
