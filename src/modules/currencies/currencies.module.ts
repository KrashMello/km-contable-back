import { Module } from "elumian/common/decorators";
import { CurrenciesController } from "./currencies.controller";
import { Currencies } from "./currencies.service";
import { ValidateUserMiddleware } from "@/globalMiddleware/validateUser.middleware";

@Module({
	controllers: [CurrenciesController],
	services: [Currencies],
	middlewares: [ValidateUserMiddleware],
})
export class CurrenciesModule {}
