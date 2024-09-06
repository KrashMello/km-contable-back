import { Service } from "elumian/core/decorators";
import { Elumian } from "elumian/core";

@Service
export class Account {
  async addAccount(data: {
    name: string;
    accountType: number;
    currencyType: number;
    userId: string;
  }) {
    const result = await Elumian.prisma.account.create({
      data: {
        name: data.name,
        account_typeId: Number(data.accountType),
        currencyId: Number(data.currencyType),
        userId: data.userId,
      },
    });
    return {
      status: 200,
      data: {
        type: "success",
        message: result,
      },
    };
  }
  async updateAccount(data: {
    name: string;
    accountType: number;
    currencyType: number;
    id: number;
    userId: string;
  }) {
    const result = await Elumian.prisma.account.update({
      data: {
        name: data.name,
        account_typeId: Number(data.accountType),
        currencyId: Number(data.currencyType),
      },
      where: {
        userId: data.userId,
        id: Number(data.id),
      },
    });
    return {
      status: 200,
      data: {
        type: "success",
        message: result,
      },
    };
  }
  async getAllAccountAmount(data: { userId: string }) {
    const groupedTransactions = await Elumian.prisma.transaction.groupBy({
      by: ["accountId", "typeId"],
      _sum: {
        amount: true,
      },
      where: {
        account: {
          userId: data.userId,
        },
      },
    });

    const accountIds = [
      ...new Set(groupedTransactions.map((t) => t.accountId)),
    ];

    const accounts = await Elumian.prisma.account.findMany({
      where: {
        id: { in: accountIds },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const result = groupedTransactions.map((transaction) => {
      const account = accounts.find((acc) => acc.id === transaction.accountId);
      return {
        account: account ? account.name : null,
        amount: transaction._sum.amount,
      };
    });
    return {
      status: 200,
      data: {
        type: "success",
        message: result,
      },
    };
  }
  async getAll(data: { userId: string }) {
    const result = await Elumian.prisma.account.findMany({
      select: {
        id: true,
        name: true,
        accountType: {
          select: {
            name: true,
          },
        },
      },
      where: {
        userId: data.userId,
      },
    });
    return {
      status: 200,
      data: result,
    };
  }
  async getAllTypes() {
    const result = await Elumian.prisma.account_type.findMany({
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
  async getCurrency() {
    const result = await Elumian.prisma.currency.findMany({
      select: {
        id: true,
        name: true,
        abbreviation: true,
      },
    });
    return {
      status: 200,
      data: result,
    };
  }
}
