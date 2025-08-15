import {
	Controller,
	Post,
} from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { Auth } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private auth: Auth) {}
	@Post("/signin")
	async signin(req, res) {
		const { username, password } = req.body;
		HttpExceptions(
			await this.auth.signin({ username, password }),
		);
	}
}
