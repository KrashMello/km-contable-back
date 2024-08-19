import { Service } from "elumian/core/decorators";
import { Elumian } from "elumian/core";

@Service
export class IncomeAndExpenses {
  async addIncomeOrExpenses(data: {
    dateEntry: Date;
    amount: number;
    description: string;
    accountId: number;
    typeId: number;
  }) {
    const IncomeOrExpenses = await Elumian.prisma.incomeAndExpenses.create({
      data: {
        date_entry: data.dateEntry,
        amount: Number(data.amount),
        description: Number(data.description),
        accountId: data.accountId,
        typeId: data.typeId,
      },
    });
    return {
      status: 200,
      data: {
        type: "success",
        message: IncomeOrExpenses,
      },
    };
  }
  async getAll(data: { userId: string }) {
    const accounts = await Elumian.prisma.account.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        userId: data.userId,
      },
    });
    return {
      status: 200,
      data: accounts,
    };
  }
}
