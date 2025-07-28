import { Module } from "elumian/common/decorators";
import { Auth } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
	controllers: [AuthController],
	services: [Auth],
	middlewares: [],
})
export class AuthModule {}
