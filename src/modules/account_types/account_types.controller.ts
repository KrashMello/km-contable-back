import {
	globalParams,
	globalSearchQuery,
} from "@/globalValidateSchema/search.params";
import {
	Controller,
	Get,
	ValidateParams,
	ValidateQuery,
} from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { Elumian } from "elumian/core";

@Controller("account_types")
export class AccountTypesController {
	@Get("/")
	@ValidateQuery(globalSearchQuery)
	async findAll(req, res) {
		const { search, limit, page } = req.query;
		HttpExceptions(
			await Elumian.AccountTypes.findAll({
				search,
				limit: +limit,
				page: +page,
			}),
		);
	}

	@Get("/:id")
	@ValidateParams(globalParams)
	async findOne(req, res) {
		const { id } = req.params;
		HttpExceptions(
			await Elumian.AccountTypes.findOne({ id: +id }),
		);
	}
}
