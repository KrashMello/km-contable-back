import { Module } from "elumian/common/decorators";
import { ApiKeys } from "./api_keys.services";
import { ApiKeysController } from "./api_keys.controller";
import { ValidateUserMiddleware } from "@/globalMiddleware/validateUser.middleware";

@Module({
	controllers: [ApiKeysController],
	services: [ApiKeys],
	middlewares: [ValidateUserMiddleware],
})
export class ApiKeysModule {}
