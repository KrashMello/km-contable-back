import { Service } from "elumian/common/decorators";
import { Prisma } from "@prisma/client";
import { Elumian } from "elumian/core";
import { HttpExceptions } from "elumian/common/exceptions";
@Service
export class Wallets {
	async count(user_id: number, args: { search: string }) {
		const { search } = args;
		return await Elumian.prisma.wallets.count({
			where: {
				OR: [
					{
						name: {
							contains: search,
						},
					},
					{
						user_id,
					},
				],
			},
		});
	}

	async findAll(
		user_id: number,
		args: {
			search?: string;
			page?: number;
			limit?: number;
		},
	) {
		const { search, page, limit } = args;
		const queryOptions: Prisma.walletsFindManyArgs = {
			select: {
				id: true,
				name: true,
				account_type_id: true,
				account_types: {
					select: {
						name: true,
					},
				},
				currency_id: true,
				currencies: {
					select: {
						name: true,
						abbreviation: true,
					},
				},
			},
			where: {
				AND: [
					{
						user_id,
					},
				],
			},
		};
		const data: {
			wallets: [];
			maxpage?: number;
			page?: number;
		} = {
			wallets: [],
		};

		if (search) {
			queryOptions.where.OR = [];
			queryOptions.where.OR.push({
				name: {
					contains: search,
				},
			});
		}
		if (page && limit) {
			queryOptions.skip = page * limit;
			queryOptions.take = limit;
			const max_users = await this.count(user_id, {
				search,
			});
			data.maxpage = Math.ceil(max_users / limit) - 1;
			data.page = page;
		} else if (limit) {
			queryOptions.take = limit;
		}
		data.wallets =
			await Elumian.prisma.wallets.findMany(queryOptions);
		return {
			status: 200,
			type: "SUCCESS",
			message: data,
		};
	}

	async findOne(
		user_id: number,
		args: {
			id?: number;
			name?: string;
			currency_id?: number;
			account_type_id?: number;
			searchType?: "OR" | "AND";
		},
	) {
		const {
			id,
			name,
			currency_id,
			account_type_id,
			searchType,
		} = args;
		const queryOptions: Prisma.walletsFindFirstArgs = {
			select: {
				id: true,
				name: true,
				account_type_id: true,
				account_types: {
					select: {
						name: true,
					},
				},
				currency_id: true,
				currencies: {
					select: {
						name: true,
						abbreviation: true,
					},
				},
			},
			where: {
				OR: [],
				AND: [
					{
						user_id,
					},
				],
			},
		};
		const querySearchType = searchType || "OR";
		if (id)
			//@ts-ignore
			queryOptions.where[querySearchType].push({
				id: { equals: +id },
			});
		if (name)
			//@ts-ignore
			queryOptions.where[querySearchType].push({
				name: { equals: name },
			});
		if (currency_id)
			//@ts-ignore
			queryOptions.where[querySearchType].push({
				currency_id: { equals: currency_id },
			});
		if (account_type_id)
			//@ts-ignore
			queryOptions.where[querySearchType].push({
				account_type_id: { equals: account_type_id },
			});
		const message =
			await Elumian.prisma.wallets.findFirst(queryOptions);
		return {
			status: 200,
			type: "SUCCESS",
			message,
		};
	}

	async create(
		user_id: number,
		data: {
			name: string;
			account_type_id: number;
			currency_id: number;
		},
	) {
		const { name, account_type_id, currency_id } = data;
		const exists = await this.findOne(user_id, { name });
		if (exists.message)
			HttpExceptions({
				status: 400,
				type: "ERROR",
				message: "wallets already exists",
			});
		const queryOptions: Prisma.walletsCreateArgs = {
			data: {
				name,
				account_type_id,
				currency_id,
				user_id,
			},
		};
		const createData =
			await Elumian.prisma.wallets.create(queryOptions);
		const walletData = await this.findOne(user_id, {
			id: createData.id,
		});
		return {
			status: 200,
			type: "SUCCESS",
			message: walletData.message,
		};
	}

	async update(
		user_id: number,
		id: number,
		data: {
			name: string;
			account_type_id: number;
			currency_id: number;
		},
	) {
		const { name, account_type_id, currency_id } = data;
		const exists = await this.findOne(user_id, {
			name,
			account_type_id,
			currency_id,
			searchType: "AND",
		});
		if (exists.message)
			if (exists.message.id !== id)
				HttpExceptions({
					status: 409,
					type: "ERROR",
					message: "wallets already exists",
				});
		const queryOptions: Prisma.walletsUpdateArgs = {
			data: {
				name,
				account_type_id,
				currency_id,
			},
			where: {
				id,
			},
		};
		await Elumian.prisma.wallets.update(queryOptions);
		const walletData = await this.findOne(user_id, {
			id,
		});
		return {
			status: 200,
			type: "SUCCESS",
			message: walletData.message,
		};
	}
}
