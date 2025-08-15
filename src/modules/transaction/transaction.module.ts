import { ValidateUserMiddleware } from "@/globalMiddleware/validateUser.middleware";
import { Module } from "elumian/common/decorators";
import { Transaction } from "./transaction.service";
import { TransactionController } from "./transaction.controller";

@Module({
	controllers: [TransactionController],
	services: [Transaction],
	middlewares: [ValidateUserMiddleware],
})
export class TransactionModule {}
