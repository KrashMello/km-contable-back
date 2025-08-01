import { Module } from "elumian/common/decorators";
import { TransactionTypesController } from "./transaction_types.controller";
import { TransactionTypes } from "./transaction_types.service";
import { ValidateUserMiddleware } from "@/globalMiddleware/validateUser.middleware";

@Module({
	controllers: [TransactionTypesController],
	services: [TransactionTypes],
	middlewares: [ValidateUserMiddleware],
})
export class TransactionTypesModule {}
