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
import { Elumian } from "elumian/core";
import { createBodySchema } from "./validateSchema/create.schema";
import { updateBodySchema } from "./validateSchema/update.schema";
@Controller("users")
export class UsersController {
	@Get("/")
	@ValidateQuery(globalSearchQuery)
	async findAll(req, res) {
		HttpExceptions(await Elumian.Users.findAll(req.query));
	}

	@Get("/:id")
	@ValidateParams(globalParams)
	async findOne(req, res) {
		const { id } = req.params;
		HttpExceptions(await Elumian.Users.findOne({ id }));
	}

	@Post("/")
	@ValidateBody(createBodySchema)
	async create(req, res) {
		const { username, password, email } = req.body;
		HttpExceptions(
			await Elumian.Users.create({
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
			await Elumian.Users.update(req.user_id, { email }),
		);
	}
}
