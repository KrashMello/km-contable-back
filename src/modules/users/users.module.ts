import { Module } from "elumian/common/decorators";
import { UsersController } from "./users.controller";
import { Users } from "./users.services";
import { ValidateUserMiddleware } from "@/globalMiddleware/validateUser.middleware";

@Module({
	controllers: [UsersController],
	services: [Users],
	middlewares: [ValidateUserMiddleware],
})
export class UsersModule {}
