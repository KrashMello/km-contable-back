import { Service } from "elumian/common/decorators";
import { Prisma } from "@prisma/client";
import { HttpExceptions } from "elumian/common/exceptions";
import { PrismaService } from "../prisma/prisma.service";

@Service()
export class AccountTypes {
	constructor(private prisma: PrismaService) {}
	async count(args: { search: string }) {
		const { search } = args;
		const queryOptions: Prisma.account_typeCountArgs = {
			select: {
				id: true,
				name: true,
			},
			where: {
				OR: [
					{
						name: {
							contains: search,
						},
					},
				],
			},
		};
		return await this.prisma.account_type.count(
			queryOptions,
		);
	}

	async findAll(args: {
		search?: string;
		limit?: number;
		page?: number;
	}) {
		const { search, limit, page } = args;
		const queryOptions: Prisma.account_typeFindManyArgs = {
			select: {
				id: true,
				name: true,
			},
			where: {},
		};
		const data: {
			account_types: any[];
			maxpage?: number;
			page?: number;
		} = {
			account_types: [],
		};
		if (search)
			queryOptions.where = {
				OR: [
					{
						name: {
							contains: search,
						},
					},
				],
			};
		if (limit && page) {
			queryOptions.skip = page * limit;
			queryOptions.take = limit;
			const max_account_types = await this.count({
				search,
			});
			data.maxpage =
				Math.ceil(max_account_types / limit) - 1;
			data.page = page;
		} else if (limit) {
			queryOptions.take = limit;
		}
		data.account_types =
			await this.prisma.account_type.findMany(queryOptions);
		return {
			status: 200,
			type: "SUCCESS",
			message: data,
		};
	}

	async findOne(args: { id?: number }) {
		const { id } = args;
		if (!id)
			HttpExceptions({
				status: 400,
				type: "ERROR",
				message: "you must provide id",
			});
		const queryOptions: Prisma.account_typeFindFirstArgs = {
			select: {
				id: true,
				name: true,
			},
			where: {
				OR: [
					{
						id: { equals: +id },
					},
				],
			},
		};
		const message =
			await this.prisma.account_type.findFirst(
				queryOptions,
			);
		return {
			status: 200,
			type: "SUCCESS",
			message,
		};
	}
}
