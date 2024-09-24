import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const ACCOUNT_LISTS = [
    { name: "CORRIENTE".toUpperCase() },
    { name: "AHORRO".toUpperCase() },
    { name: "EFECTIVO".toUpperCase() },
    { name: "CREDITO".toUpperCase() },
  ];
  const CURRENCY_LISTS = [
    { name: "USD", abbreviation: "$" },
    { name: "BOLIVARES", abbreviation: "Bs." },
  ];
  const TRANSACTION_TYPE_LISTS = [{ name: "IGRESOS" }, { name: "GASTOS" }];
  const CATEGORY = [
    {
      name: "🥞 COMIDA",
      userId: 1,
      transaction_typeId: 2,
      accountId: null,
      currencyId: null,
    },
    {
      name: "🚕 TRASNPORTE",
      userId: 1,
      transaction_typeId: 2,
      accountId: null,
      currencyId: null,
    },
    {
      name: "👕 ROPA",
      userId: 1,
      transaction_typeId: 2,
      accountId: null,
      currencyId: null,
    },
    {
      name: "💊 SALUD",
      userId: 1,
      transaction_typeId: 2,
      accountId: null,
      currencyId: null,
    },
    {
      name: "🌐 OTROS",
      userId: 1,
      transaction_typeId: 2,
      accountId: null,
      currencyId: null,
    },
  ];
  for (let account_type of ACCOUNT_TYPE_LISTS) {
    await prisma.account.create({
      data: account_type,
    });
  }
  for (let currency of CURRENCY_LISTS) {
    await prisma.currency.create({
      data: currency,
    });
  }
  for (let type of TYPE_INCOME_AND_EXPENSES_LISTS) {
    await prisma.transaction_type.create({
      data: type,
    });
  }
  await prisma.users.create({
    data: {
      username: "krashmello",
      password: bcrypt.hashSync("1234", 10),
      category: {
        create: [
          {
            name: "ROPA",
            accountId: null,
            transaction_typeId: 2,
            currencyId: null,
          },
          {
            name: "COMIDA",
            accountId: null,
            transaction_typeId: 2,
            currencyId: null,
          },
          {
            name: "OTROS",
            accountId: null,
            transaction_typeId: 2,
            currencyId: null,
          },
        ],
      },
    },
  });
  for (let category of CATEGORY) {
    await prisma.category.create({ data: category });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
