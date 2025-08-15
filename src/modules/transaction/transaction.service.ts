import { Prisma } from "@prisma/client";
import { Service } from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { PrismaService } from "../prisma/prisma.service";

@Service()
export class Transaction {
	constructor(private prisma: PrismaService) {}
	async count(user_id: number, args: { search: string }) {
		const { search } = args;
		const queryOptions: Prisma.transactionsCountArgs = {
			where: {
				AND: [
					{
						wallets: {
							AND: [{ user_id: user_id }],
						},
					},
				],
				OR: [
					{
						categories: {
							name: {
								contains: search,
							},
						},
					},
					{
						description: {
							contains: search,
						},
					},
					{
						date: {
							equals: search,
						},
					},
				],
			},
		};
		return await this.prisma.transactions.count(
			queryOptions,
		);
	}
	async findAll(
		user_id: number,
		args: {
			search?: string;
			limit?: number;
			page?: number;
		},
	) {
		const { search, limit, page } = args;
		const queryOptions: Prisma.transactionsFindManyArgs = {
			where: {
				AND: [
					{
						wallets: {
							AND: [{ user_id: user_id }],
						},
					},
				],
			},
		};
		const data: {
			transactions: any[];
			maxpage?: number;
			page?: number;
		} = {
			transactions: [],
		};
		if (search)
			queryOptions.where = {
				OR: [
					{
						categories: {
							name: {
								contains: search,
							},
						},
					},
					{
						date: {
							equals: search,
						},
					},
					{
						description: {
							contains: search,
						},
					},
				],
			};
		if (limit && page) {
			queryOptions.skip = page * limit;
			queryOptions.take = limit;
			const max_transactions = await this.count(user_id, {
				search,
			});
			data.maxpage =
				Math.ceil(max_transactions / limit) - 1;
			data.page = page;
		} else if (limit) {
			queryOptions.take = limit;
		}
		data.transactions =
			await this.prisma.transactions.findMany(queryOptions);
		return {
			status: 200,
			type: "SUCCESS",
			message: data,
		};
	}

	async findOne(user_id: number, args: { id?: number }) {
		const { id } = args;
		if (!id)
			HttpExceptions({
				status: 400,
				type: "ERROR",
				message: "you must provide id",
			});
		const queryOptions: Prisma.transactionsFindFirstArgs = {
			select: {
				id: true,
				date: true,
				description: true,
				amount: true,
				categories: {
					select: {
						name: true,
					},
				},
				wallets: {
					select: {
						name: true,
					},
				},
			},
			where: {
				AND: [
					{
						wallets: {
							AND: [{ user_id: user_id }],
						},
					},
				],
				OR: [
					{
						id: { equals: +id },
					},
				],
			},
		};
		const message =
			await this.prisma.transactions.findFirst(
				queryOptions,
			);
		return {
			status: 200,
			type: "SUCCESS",
			message,
		};
	}

	async create(
		user_id: number,
		args: {
			wallet_id: number;
			description: string;
			amount: number;
			date: string;
			category_id: number;
		},
	) {
		const {
			wallet_id,
			description,
			amount,
			date,
			category_id,
		} = args;
		const queryOptions: Prisma.transactionsCreateArgs = {
			data: {
				category_id,
				wallet_id,
				description,
				amount,
				date: new Date(date),
			},
		};
		const create_data =
			await this.prisma.transactions.create(queryOptions);
		const transaction = await this.findOne(user_id, {
			id: create_data.id,
		});
		return {
			status: 200,
			type: "SUCCESS",
			message: transaction.message,
		};
	}
}
