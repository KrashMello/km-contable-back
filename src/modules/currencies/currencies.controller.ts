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
import { Currencies } from "./currencies.service";

@Controller("currencies")
export class CurrenciesController {
	constructor(private currencies: Currencies) {}
	@Get("/")
	@ValidateQuery(globalSearchQuery)
	async findAll(req, res) {
		const { search, limit, page } = req.query;
		HttpExceptions(
			await this.currencies.findAll({
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
			await this.currencies.findOne({ id: +id }),
		);
	}
}
