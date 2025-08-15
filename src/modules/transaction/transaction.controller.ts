import {
	Controller,
	Post,
	ValidateBody,
} from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { createBodySchema } from "./validationsSchemas/create.schema";
import { Transaction } from "./transaction.service";

@Controller("transaction")
export class TransactionController {
	constructor(private transaction: Transaction) {}
	@Post("/")
	@ValidateBody(createBodySchema)
	async create(req, res) {
		HttpExceptions(
			await this.transaction.create(req.user_id, {
				wallet_id: +req.body.wallet_id,
				description: req.body.description,
				amount: +req.body.amount,
				date: req.body.date,
				category_id: +req.body.category_id,
			}),
		);
	}
}
