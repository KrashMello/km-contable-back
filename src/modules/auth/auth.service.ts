import { Service } from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { Elumian } from "elumian/core";
import bcrypt from "bcrypt";

@Service
export class Auth {
	async signin(data: {
		username: string;
		password: string;
	}) {
		const { username, password } = data;
		const sessions = Elumian.cache.list["Sessions"];
		const userloging = sessions
			? sessions.find(
					(session) => session.data.username === username,
				)
			: null;
		if (userloging)
			HttpExceptions({
				status: 401,
				type: "ERROR",
				message: "user is already logged in",
			});
		const credentials =
			await Elumian.Users.credentials(username);
		if (!bcrypt.compare(password, credentials))
			HttpExceptions({
				status: 401,
				type: "ERROR",
				message: "Invalid username or password",
			});
		const userData = await Elumian.Users.findOne({
			username,
		});
		await Elumian.cache.singData({
			key: "Sessions",
			data: { username },
		});
		const token = await Elumian.cache.singData({
			key: "Auth",
			data: userData.message,
			encrypted: true,
		}).id;
		return {
			status: 200,
			type: "SUCCESS",
			message: token,
		};
	}
	async logout(data: { token: string }) {
		const { token } = data;
		return {
			status: 200,
			type: "SUCCESS",
			message: "Logged out",
		};
	}
}
