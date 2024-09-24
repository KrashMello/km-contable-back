import { Service } from "elumian/core/decorators";
import { Elumian } from "elumian/core";

@Service
export class Transaction {
  async addTransaction(data: {
    dateEntry: Date;
    amount: number;
    description: string;
    categoryId: number;
    categoryDebitId: number;
  }) {
    const transaction = await Elumian.prisma.transaction.create({
      data: {
        date_entry: new Date(data.dateEntry),
        amount: Number(data.amount),
        description: data.description,
        categoryId: Number(data.categoryId),
        categoryDebitId: data.categoryDebitId
          ? Number(data.categoryDebitId)
          : null,
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
            transactionType: {
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
        category: {
          is: {
            userId: data.userId,
            transaction_typeId: 1,
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
        category: {
          select: {
            name: true,
            transactionType: {
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
        category: {
          is: {
            userId: data.userId,
            transaction_typeId: 2,
          },
        },
      },
    });
    return {
      status: 200,
      data: result,
    };
  }
  async getAllMounts(data: { userId: string }) {
    const result = await Elumian.prisma.vwAllAmountPerIncome.findMany({
      select: {
        totalAmount: true,
        name: true,
      },
    });
    return {
      status: 200,
      data: result,
    };
  }
  async getTypes() {
    const result = await Elumian.prisma.transaction_type.findMany({
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
