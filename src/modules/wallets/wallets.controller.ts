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
import { createBodySchema } from "./validationsSchema/create.schema";
import { Wallets } from "./wallets.services";

@Controller("wallets")
export class WalletsController {
	constructor(private wallets: Wallets) {}
	@Get("/")
	@ValidateQuery(globalSearchQuery)
	async findAll(req, res) {
		HttpExceptions(
			await this.wallets.findAll(req.user_id, {
				...req.query,
			}),
		);
	}

	@Get("/:id")
	@ValidateQuery(globalSearchQuery)
	@ValidateParams(globalParams)
	async findOne(req, res) {
		HttpExceptions(
			await this.wallets.findOne(req.user_id, {
				id: +req.params.id,
			}),
		);
	}

	@Post("/")
	@ValidateBody(createBodySchema)
	async create(req, res) {
		const { name, account_type_id, currency_id } = req.body;
		HttpExceptions(
			await this.wallets.create(req.user_id, {
				name,
				account_type_id: +account_type_id,
				currency_id: +currency_id,
			}),
		);
	}

	@Put("/:id")
	@ValidateBody(createBodySchema)
	async update(req, res) {
		const { name, account_type_id, currency_id } = req.body;
		HttpExceptions(
			await this.wallets.update(
				req.user_id,
				+req.params.id,
				{
					name,
					account_type_id: +account_type_id,
					currency_id: +currency_id,
				},
			),
		);
	}
}
