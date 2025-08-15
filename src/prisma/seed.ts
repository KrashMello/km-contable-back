import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
	const ACCOUNT_TYPE_LISTS = [
		{ name: "CORRIENTE".toUpperCase() },
		{ name: "AHORRO".toUpperCase() },
		{ name: "EFECTIVO".toUpperCase() },
		{ name: "CREDITO".toUpperCase() },
	];
	const CURRENCIES_LISTS = [
		{ name: "USD", abbreviation: "$" },
		{ name: "BOLIVARES", abbreviation: "Bs." },
	];
	const TRANSACTION_TYPE_LISTS = [
		{ name: "INGRESOS" },
		{ name: "GASTOS" },
	];
	const CATEGORY_LISTS = [
		{
			name: "💰 SALARIO",
			user_id: null,
			transaction_type_id: 1,
			is_global: true,
		},
		{
			name: "🎁 REGALO",
			user_id: null,
			transaction_type_id: 1,
			is_global: true,
		},
		{
			name: "➕ OTROS",
			user_id: null,
			transaction_type_id: 1,
			is_global: true,
		},
		{
			name: "🥞 COMIDA",
			user_id: null,
			transaction_type_id: 2,
			is_global: true,
		},
		{
			name: "🚕 TRASNPORTE",
			user_id: null,
			transaction_type_id: 2,
			is_global: true,
		},
		{
			name: "👕 ROPA",
			user_id: null,
			transaction_type_id: 2,
			is_global: true,
		},
		{
			name: "💊 SALUD",
			user_id: null,
			transaction_type_id: 2,
			is_global: true,
		},
		{
			name: "➕ OTROS",
			user_id: null,
			transaction_type_id: 2,
			is_global: true,
		},
	];
	const STATUS_LISTS = [
		{
			name: "ACTIVE",
		},
		{
			name: "INACTIVE",
		},
	];
	for (let account_type of ACCOUNT_TYPE_LISTS) {
		await prisma.account_type.create({
			data: account_type,
		});
	}
	for (let currency of CURRENCIES_LISTS) {
		await prisma.currencies.create({
			data: currency,
		});
	}
	for (let type of TRANSACTION_TYPE_LISTS) {
		await prisma.transaction_types.create({
			data: type,
		});
	}
	for (let status of STATUS_LISTS) {
		await prisma.status.create({
			data: status,
		});
	}
	for (let category of CATEGORY_LISTS) {
		await prisma.categories.create({ data: category });
	}
	await prisma.users.create({
		data: {
			username: "krashmello",
			email: "krashmello@gmail.com",
			password: bcrypt.hashSync("1234", 10),
			status_id: 1,
		},
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
