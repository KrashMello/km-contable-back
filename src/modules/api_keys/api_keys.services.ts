import { Service } from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { Elumian } from "elumian/core";
import { PrismaService } from "../prisma/prisma.service";

@Service()
export class ApiKeys {
	constructor(private prisma: PrismaService) {}
	async create(user_id: number) {
		const apiData = await this.prisma.api_keys.create({
			select: {
				code: true,
			},
			data: {
				user_id,
				code: Elumian.crypto.codeGen(72),
			},
		});
		return {
			status: 200,
			type: "SUCCESS",
			message: apiData,
		};
	}

	async getUserId(code: string) {
		const apiData = await this.prisma.api_keys.findFirst({
			select: {
				user_id: true,
			},
			where: {
				code,
			},
		});
		if (!apiData)
			HttpExceptions({
				status: 400,
				type: "ERROR",
				message: "api key is invalid",
			});
		return {
			status: 200,
			type: "SUCCESS",
			message: apiData,
		};
	}
}
