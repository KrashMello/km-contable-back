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
import { AccountTypes } from "./account_types.service";

@Controller("account_types")
export class AccountTypesController {
	constructor(private accountTypes: AccountTypes) {}
	@Get("/")
	@ValidateQuery(globalSearchQuery)
	async findAll(req, res) {
		const { search, limit, page } = req.query;
		HttpExceptions(
			await this.accountTypes.findAll({
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
			await this.accountTypes.findOne({ id: +id }),
		);
	}
}
