import { Service } from "elumian/common/decorators";
import { Elumian } from "elumian/core";
import { Prisma } from "@prisma/client";
import { HttpExceptions } from "elumian/common/exceptions";
import bcrypt from "bcrypt";

@Service
export class Users {
	async count(args: { search: string }) {
		const { search } = args;
		return await Elumian.prisma.users.count({
			where: {
				OR: [
					{
						username: {
							contains: search,
						},
					},
				],
			},
		});
	}

	async findAll(args: {
		search?: string;
		page?: number;
		limit?: number;
	}) {
		const { search, page, limit } = args;
		const data: {
			users: {
				id: number;
				username: string;
				email: string;
			}[];
			maxpage?: number;
			page?: number;
		} = {
			users: [],
		};
		const queryOptions: Prisma.usersFindManyArgs = {
			select: {
				id: true,
				username: true,
				email: true,
			},
		};
		if (search)
			queryOptions.where = {
				username: {
					contains: search,
				},
			};
		if (page && limit) {
			queryOptions.skip = page * limit;
			queryOptions.take = limit;
			const max_users = await this.count({ search });
			data.maxpage = Math.ceil(max_users / limit) - 1;
			data.page = page;
		} else if (page) {
			queryOptions.take = limit;
		}
		data.users =
			await Elumian.prisma.users.findMany(queryOptions);
		return {
			status: 200,
			type: "SUCCESS",
			message: data,
		};
	}

	async credentials(data: string) {
		if (!data)
			HttpExceptions({
				status: 400,
				type: "ERROR",
				message: "you must provide username or email",
			});
		const queryOptions: Prisma.usersFindFirstArgs = {
			select: {
				password: true,
			},
			where: {
				OR: [
					{
						username: { equals: data },
					},
					{
						email: { equals: data },
					},
				],
			},
		};
		const response =
			await Elumian.prisma.users.findFirst(queryOptions);

		return response.password;
	}

	async findOne(args: {
		id?: number;
		username?: string;
		email?: string;
	}) {
		const { id, username, email } = args;
		if (!id && !username && !email)
			HttpExceptions({
				status: 400,
				type: "ERROR",
				message: "You must provide id, username or email",
			});
		const queryOptions: Prisma.usersFindFirstArgs = {
			select: {
				id: true,
				username: true,
				email: true,
			},
			where: { OR: [] },
		};
		if (id)
			queryOptions.where.OR.push({ id: { equals: +id } });
		if (username)
			queryOptions.where.OR.push({
				username: { equals: username },
			});
		if (email)
			queryOptions.where.OR.push({
				email: { equals: email },
			});
		const message =
			await Elumian.prisma.users.findFirst(queryOptions);

		return {
			status: 200,
			type: "SUCCESS",
			message,
		};
	}

	async create(data: {
		username: string;
		password: string;
		email: string;
	}) {
		const { username, password, email } = data;
		const exists = await this.findOne({ username, email });
		if (exists.message)
			HttpExceptions({
				status: 400,
				type: "ERROR",
				message: "User already exists",
			});
		const queryOptions: Prisma.usersCreateArgs = {
			data: {
				username,
				password: bcrypt.hashSync(password, 10) as string,
				email,
				status_id: 1,
			},
		};
		const createData =
			await Elumian.prisma.users.create(queryOptions);
		const userData = await this.findOne({
			id: createData.id,
		});
		return {
			status: 200,
			type: "SUCCESS",
			message: userData.message,
		};
	}

	async update(
		id: number,
		data: {
			email: string;
		},
	) {
		const { email } = data;
		const exists = await this.findOne({ email });
		if (exists.message)
			if (exists.message.id !== id)
				HttpExceptions({
					status: 409,
					type: "ERROR",
					message: "email already exists",
				});
		const queryOptions: Prisma.usersUpdateArgs = {
			data: {
				email,
			},
			where: {
				id,
			},
		};
		await Elumian.prisma.users.update(queryOptions);
		const userData = await this.findOne({
			id,
		});
		return {
			status: 200,
			type: "SUCCESS",
			message: userData.message,
		};
	}
}
