export const createBodySchema = {
	wallet_id: ["numeric", "required"],
	description: ["alphaNumeric", "required"],
	amount: ["numeric", "required"],
	date: ["date", "required"],
	category_id: ["numeric", "required"],
};
