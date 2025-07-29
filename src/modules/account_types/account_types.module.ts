import { ValidateUserMiddleware } from "@/globalMiddleware/validateUser.middleware";
import { Module } from "elumian/common/decorators";
import { AccountTypesController } from "./account_types.controller";
import { AccountTypes } from "./account_types.service";

@Module({
	controllers: [AccountTypesController],
	services: [AccountTypes],
	middlewares: [ValidateUserMiddleware],
})
export class AccountTypesModule {}
