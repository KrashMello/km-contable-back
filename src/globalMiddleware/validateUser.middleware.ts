import { Middleware } from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { Elumian } from "elumian/core";

@Middleware
export class ValidateUserMiddleware {
	async init(contex) {
		const { handler, request, response } = contex;
		//@ts-ignore
		const isPublic = Reflect.getMetadata(
			"isPublic",
			handler,
		);
		if (isPublic) return true;
		else {
			const api_key = request.get("km-api-key");
			if (api_key) {
				const apiData =
					await Elumian.ApiKeys.getUserId(api_key);
				request.user_id = apiData.user_id;
				return true;
			}

			const token = request.get("km-access-token");
			if (!token)
				HttpExceptions({
					status: 401,
					type: "ERROR",
					message: "token is required",
				});
			const verifyId = await Elumian.cache.verifyId(
				"Auth",
				token,
			);
			if (!verifyId)
				HttpExceptions({
					status: 401,
					type: "ERROR",
					message: "token is invalid",
				});
			const tokenData = await Elumian.cache.getData(
				"Auth",
				token,
			);
			const { id } = Elumian.crypto.hardDecrypt(
				tokenData,
				true,
			);
			request.user_id = id;
			return true;
		}
	}
}
