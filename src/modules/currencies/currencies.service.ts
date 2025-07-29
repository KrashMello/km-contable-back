import { Service } from "elumian/common/decorators";
import { Elumian } from "elumian/core";
import { Prisma } from "@prisma/client";
import { HttpExceptions } from "elumian/common/exceptions";

@Service
export class Currencies {
	async count(args: { search: string }) {
		const { search } = args;
		const queryOptions: Prisma.currenciesCountArgs = {
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
		return await Elumian.prisma.currencies.count();
	}

	async findAll(args: {
		search?: string;
		limit?: number;
		page?: number;
	}) {
		const { search, limit, page } = args;
		const queryOptions: Prisma.currenciesFindManyArgs = {
			select: {
				id: true,
				name: true,
				abbreviation: true,
			},
			where: {},
		};
		const data: {
			currencies: [];
			maxpage?: number;
			page?: number;
		} = {
			currencies: [],
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
			const max_currencies = await this.count({ search });
			data.maxpage = Math.ceil(max_currencies / limit) - 1;
			data.page = page;
		} else if (limit) {
			queryOptions.take = limit;
		}
		data.currencies =
			await Elumian.prisma.currencies.findMany(
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
		const queryOptions: Prisma.currenciesFindFirstArgs = {
			select: {
				id: true,
				name: true,
				abbreviation: true,
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
			await Elumian.prisma.currencies.findFirst(
				queryOptions,
			);
		return {
			status: 200,
			type: "SUCCESS",
			message,
		};
	}
}
