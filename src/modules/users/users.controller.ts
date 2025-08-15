import {
	globalParams,
	globalSearchQuery,
} from "@/globalValidateSchema/search.params";
import {
	Controller,
	Get,
	Post,
	Put,
	ValidateBody,
	ValidateParams,
	ValidateQuery,
} from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { createBodySchema } from "./validateSchema/create.schema";
import { updateBodySchema } from "./validateSchema/update.schema";
import { Users } from "./users.services";
@Controller("users")
export class UsersController {
	constructor(private users: Users) {}
	@Get("/")
	@ValidateQuery(globalSearchQuery)
	async findAll(req, res) {
		HttpExceptions(await this.users.findAll(req.query));
	}

	@Get("/:id")
	@ValidateParams(globalParams)
	async findOne(req, res) {
		const { id } = req.params;
		HttpExceptions(await this.users.findOne({ id }));
	}

	@Post("/")
	@ValidateBody(createBodySchema)
	async create(req, res) {
		const { username, password, email } = req.body;
		HttpExceptions(
			await this.users.create({
				username,
				password,
				email,
			}),
		);
	}

	@Put("/")
	@ValidateBody(updateBodySchema)
	async update(req, res) {
		const { email } = req.body;
		HttpExceptions(
			await this.users.update(req.user_id, { email }),
		);
	}
}
