import { Prisma } from "@prisma/client";
import { Service } from "elumian/common/decorators";
import { HttpExceptions } from "elumian/common/exceptions";
import { Elumian } from "elumian/core";

@Service
export class Categories {
	async count(args: { search: string }) {
		const { search } = args;
		const queryOptions: Prisma.categoriesCountArgs = {
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
		return await Elumian.prisma.category.count(
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
		const queryOptions: Prisma.categoriesFindManyArgs = {
			select: {
				id: true,
				name: true,
			},
			where: {},
		};
		const data: {
			categories: [];
			maxpage?: number;
			page?: number;
		} = {
			categories: [],
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
				AND: [
					{
						OR: [
							{
								user_id: {
									equals: user_id,
								},
							},
							{
								user_id: {
									equals: null,
								},
							},
						],
					},
				],
			};
		if (limit && page) {
			queryOptions.skip = page * limit;
			queryOptions.take = limit;
			const max_categories = await this.count({
				search,
			});
			data.maxpage = Math.ceil(max_categories / limit) - 1;
			data.page = page;
		} else if (limit) {
			queryOptions.take = limit;
		}
		data.categories =
			await Elumian.prisma.categories.findMany(
				queryOptions,
			);
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
			transaction_type_id?: number;
			is_global?: boolean;
			type?: "OR" | "AND";
		},
	) {
		const {
			id,
			name,
			transaction_type_id,
			is_global,
			type,
		} = args;
		if (!id && !name && !transaction_type_id)
			HttpExceptions({
				status: 400,
				type: "ERROR",
				message:
					"you must provide id, name or transaction_type_id",
			});
		const filterType = type || "OR";
		const queryOptions: Prisma.categoriesFindFirstArgs = {
			select: {
				id: true,
				name: true,
				is_global: true,
			},
			where: {
				OR: [],
				AND: [
					{
						OR: [
							{
								user_id: {
									equals: user_id,
								},
							},
							{
								user_id: {
									equals: null,
								},
							},
						],
					},
				],
			},
		};
		if (is_global)
			//@ts-ignore
			queryOptions.where[filterType].push({
				is_global: {
					equals: true,
				},
			});
		if (id)
			//@ts-ignore
			queryOptions.where[filterType].push({
				id: {
					equals: id,
				},
			});
		if (name && transaction_type_id) {
			//@ts-ignore
			queryOptions.where[filterType].push({
				AND: [
					{
						transaction_type_id: {
							equals: transaction_type_id,
						},
					},
					{
						name: {
							equals: name,
						},
					},
				],
			});
		} else if (name) {
			//@ts-ignore
			queryOptions.where[filterType].push({
				name: {
					equals: name,
				},
			});
		} else if (transaction_type_id)
			//@ts-ignore
			queryOptions.where[filterType].push({
				transaction_type_id: {
					equals: transaction_type_id,
				},
			});
		const message =
			await Elumian.prisma.categories.findFirst(
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
		args: { name: string; transaction_type_id: number },
	) {
		let { name, transaction_type_id } = args;
		name = name.toUpperCase();
		if (!name && transaction_type_id)
			HttpExceptions({
				status: 400,
				type: "ERROR",
				message: "you must provide name",
			});
		const existsName = await this.findOne(user_id, {
			name,
			transaction_type_id,
			is_global: false,
			type: "OR",
		});
		console.log(existsName);
		if (existsName.message)
			HttpExceptions({
				status: 400,
				type: "ERROR",
				message: "name already exists",
			});
		/* NOTE: aqui debes agregar la validadion
		   de que exista la transaction_type_id
		   cuando crees el servicio
    */
		const queryOptions: Prisma.categoriesCreateArgs = {
			select: {
				id: true,
				name: true,
				transaction_type_id: true,
			},
			data: {
				name,
				user_id,
				transaction_type_id,
				is_global: false,
			},
		};
		const message =
			await Elumian.prisma.categories.create(queryOptions);
		return {
			status: 200,
			type: "SUCCESS",
			message,
		};
	}
}
