import {
	Controller,
	Post,
} from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { Elumian } from "elumian/core";

@Controller("auth")
export class AuthController {
	@Post("/signin")
	async signin(req, res) {
		const { username, password } = req.body;
		HttpExceptions(
			await Elumian.Auth.signin({ username, password }),
		);
	}
}
