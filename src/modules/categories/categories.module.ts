import { Module } from "elumian/common/decorators";
import { CategoriesController } from "./categories.controller";
import { Categories } from "./categories.service";
import { ValidateUserMiddleware } from "@/globalMiddleware/validateUser.middleware";

@Module({
	controllers: [CategoriesController],
	services: [Categories],
	middlewares: [ValidateUserMiddleware],
})
export class CategoriesModule {}
