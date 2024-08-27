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
    const IncomeOrExpenses = await Elumian.prisma.income_and_expenses.create({
      data: {
        date_entry: new Date(data.dateEntry),
        amount: Number(data.amount),
        description: data.description,
        accountId: Number(data.accountId),
        typeId: Number(data.typeId),
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
        account: {
          select: {
            name: true,
            accountType: {
              select: {
                name: true,
              },
            },
          },
        },
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
  async getAllMounts(data: { userId: string }) {
    const groupedData = await Elumian.prisma.income_and_expenses.groupBy({
      by: ["typeId", "accountId"],
      _sum: {
        amount: true,
      },
    });

    const accountIds = [
      ...new Set(groupedData.map((group) => group.accountId)),
    ];
    const typeIds = [...new Set(groupedData.map((group) => group.typeId))];

    const accounts = await Elumian.prisma.account.findMany({
      where: {
        id: {
          in: accountIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const types = await Elumian.prisma.type_income_and_expenses.findMany({
      where: {
        id: {
          in: typeIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const result = groupedData.map((group) => ({
      totalAmount: group._sum.amount,
      accountName:
        accounts.find((account) => account.id === group.accountId)?.name ||
        null,
      typeName: types.find((type) => type.id === group.typeId)?.name || null,
    }));
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
