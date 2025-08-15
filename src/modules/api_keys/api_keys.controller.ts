import {
	Controller,
	Post,
} from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { Elumian } from "elumian/core";
import { ApiKeys } from "./api_keys.services";

@Controller("api_keys")
export class ApiKeysController {
	constructor(private apiKeys: ApiKeys) {}
	@Post("/")
	async create(req, res) {
		HttpExceptions(await this.apiKeys.create(req.user_id));
	}
}
