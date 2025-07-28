import { Module } from "elumian/common/decorators";
import { WalletsController } from "./wallets.controller";
import { ValidateUserMiddleware } from "@/globalMiddleware/validateUser.middleware";
import { Wallets } from "./wallets.services";

@Module({
	controllers: [WalletsController],
	services: [Wallets],
	middlewares: [ValidateUserMiddleware],
})
export class WalletsModule {}
