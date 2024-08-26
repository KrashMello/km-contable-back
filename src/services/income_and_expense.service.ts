import { Service } from "elumian/core/decorators";
import { Elumian } from "elumian/core";

@Service
export class IncomeAndExpenses {
  async addIncomeOrExpense(data: {
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
  async getAllIncomes(data: { userId: string }) {
    const result = await Elumian.prisma.income_and_expenses.findMany({
      select: {
        id: true,
        date_entry: true,
        description: true,
        amount: true,
      },
      where: {
        userId: data.userId,
        typeId: 1,
      },
    });
    return {
      status: 200,
      data: result,
    };
  }
  async getAllExpenses(data: { userId: string }) {
    const result = await Elumian.prisma.income_and_expenses.findMany({
      select: {
        id: true,
        date_entry: true,
        description: true,
        amount: true,
      },
      where: {
        userId: data.userId,
        typeId: 2,
      },
    });
    return {
      status: 200,
      data: result,
    };
  }
  async getTypes() {
    const result = await Elumian.prisma.type_income_and_expenses.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return {
      status: 200,
      data: result,
    };
  }
}
