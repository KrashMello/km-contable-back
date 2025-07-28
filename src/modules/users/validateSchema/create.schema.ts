export const createBodySchema = {
	username: ["alphaNumeric", "required"],
	password: ["alphaNumeric", "required"],
	email: ["email", "required"],
};
