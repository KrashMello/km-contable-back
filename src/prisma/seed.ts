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
  const CURRENCY_LISTS = [
    { name: "USD", abbreviation: "$" },
    { name: "BOLIVARES", abbreviation: "Bs." },
  ];
  const TYPE_INCOME_AND_EXPENSES_LISTS = [
    { name: "IGRESOS" },
    { name: "GASTOS" },
  ];
  for (let account_type of ACCOUNT_TYPE_LISTS) {
    await prisma.account_type.create({
      data: account_type,
    });
  }
  for (let currency of CURRENCY_LISTS) {
    await prisma.currency.create({
      data: currency,
    });
  }
  for (let type of TYPE_INCOME_AND_EXPENSES_LISTS) {
    await prisma.type_transaction.create({
      data: type,
    });
  }
  await prisma.users.create({
    data: {
      username: "krashmello",
      password: bcrypt.hashSync("1234", 10),
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
    process.exit(1);
  });
