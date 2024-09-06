import { Service } from "elumian/core/decorators";
import { Elumian } from "elumian/core";

@Service
export class Transaction {
  async addTransaction(data: {
    dateEntry: Date;
    amount: number;
    description: string;
    categoryId: number;
  }) {
    const transaction = await Elumian.prisma.transaction.create({
      data: {
        date_entry: new Date(data.dateEntry),
        amount: Number(data.amount),
        description: data.description,
        categoryId: Number(data.categoryId),
      },
    });
    return {
      status: 200,
      data: {
        type: "success",
        message: transaction,
      },
    };
  }
  async getAllIncomes(data: { userId: string }) {
    const result = await Elumian.prisma.transaction.findMany({
      select: {
        id: true,
        date_entry: true,
        description: true,
        amount: true,
        category: {
          select: {
            name: true,
            account: {
              select: {
                name: true,
              },
            },
            currency: {
              select: {
                abbreviation: true,
              },
            },
          },
        },
      },
      where: {
        userId: data.userId,
        category: {
          transactionType: {
            is: {
              id: 1,
            },
          },
        },
      },
    });
    return {
      status: 200,
      data: result,
    };
  }
  async getAllExpenses(data: { userId: string }) {
    const result = await Elumian.prisma.transaction.findMany({
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
            currency: {
              select: {
                abbreviation: true,
              },
            },
          },
        },
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
    const groupedData = await Elumian.prisma.transaction.groupBy({
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

    const types = await Elumian.prisma.type_transaction.findMany({
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
    const result = await Elumian.prisma.type_transaction.findMany({
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
