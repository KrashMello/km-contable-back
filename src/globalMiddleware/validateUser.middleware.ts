import { Middleware } from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { Elumian } from "elumian/core";

@Middleware
export class ValidateUserMiddleware {
	init(contex) {
		const { handler, request, response } = contex;
		//@ts-ignore
		const isPublic = Reflect.getMetadata(
			"isPublic",
			handler,
		);
		if (isPublic) return true;
		else {
			const token = request.get("km-access-token");
			if (!token)
				HttpExceptions({
					status: 401,
					type: "ERROR",
					message: "token is required",
				});
			const { id } = Elumian.crypto.hardDecrypt(token);
			request.set("user_id", id);
		}
	}
}
