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
import { Elumian } from "elumian/core";
import { createBodySchema } from "./validationSchema/create.schema";

@Controller("categories")
export class CategoriesController {
	@Get("/")
	@ValidateQuery(globalSearchQuery)
	async findAll(request, response) {
		const { search, limit, page } = request.query;
		HttpExceptions(
			await Elumian.Categories.findAll(request.user_id, {
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
			await Elumian.Categories.findOne(request.user_id, {
				id: +id,
			}),
		);
	}

	@Post("/")
	@ValidateBody(createBodySchema)
	async create(request, response) {
		const { name, transaction_type_id } = request.body;
		HttpExceptions(
			await Elumian.Categories.create(request.user_id, {
				name,
				transaction_type_id: +transaction_type_id,
			}),
		);
	}
}
