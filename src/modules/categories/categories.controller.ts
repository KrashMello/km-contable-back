import {
	globalParams,
	globalSearchQuery,
} from "@/globalValidateSchema/search.params";
import {
	Controller,
	Get,
	Post,
	ValidateBody,
	ValidateParams,
	ValidateQuery,
} from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { createBodySchema } from "./validationSchema/create.schema";
import { Categories } from "./categories.service";

@Controller("categories")
export class CategoriesController {
	constructor(private categories: Categories) {}
	@Get("/")
	@ValidateQuery(globalSearchQuery)
	async findAll(request, response) {
		const { search, limit, page } = request.query;
		HttpExceptions(
			await this.categories.findAll(request.user_id, {
				search,
				limit: +limit,
				page: +page,
			}),
		);
	}

	@Get("/:id")
	@ValidateParams(globalParams)
	async findOne(request, response) {
		const { id } = request.params;

		HttpExceptions(
			await this.categories.findOne(request.user_id, {
				id: +id,
			}),
		);
	}

	@Post("/")
	@ValidateBody(createBodySchema)
	async create(request, response) {
		const { name, transaction_type_id } = request.body;
		HttpExceptions(
			await this.categories.create(request.user_id, {
				name,
				transaction_type_id: +transaction_type_id,
			}),
		);
	}
}
