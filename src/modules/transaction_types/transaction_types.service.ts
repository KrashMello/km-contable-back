import { Prisma } from "@prisma/client";
import { Service } from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { Elumian } from "elumian/core";

@Service
export class TransactionTypes {
	async count(args: { search: string }) {
		const { search } = args;
		const queryOptions: Prisma.transaction_typesCountArgs =
			{
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
		return await Elumian.prisma.transaction_types.count(
			queryOptions,
		);
	}

	async findAll(args: {
		search?: string;
		limit?: number;
		page?: number;
	}) {
		const { search, limit, page } = args;
		const queryOptions: Prisma.transaction_typesFindManyArgs =
			{
				select: {
					id: true,
					name: true,
				},
				where: {},
			};
		const data: {
			transaction_types: [];
			maxpage?: number;
			page?: number;
		} = {
			transaction_types: [],
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
			const max_transaction_types = await this.count({
				search,
			});
			data.maxpage =
				Math.ceil(max_transaction_types / limit) - 1;
			data.page = page;
		} else if (limit) {
			queryOptions.take = limit;
		}
		data.transaction_types =
			await Elumian.prisma.transaction_types.findMany(
				queryOptions,
			);
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
		const queryOptions: Prisma.transaction_typesFindFirstArgs =
			{
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
			await Elumian.prisma.transaction_types.findFirst(
				queryOptions,
			);
		return {
			status: 200,
			type: "SUCCESS",
			message,
		};
	}
}
