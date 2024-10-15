import { Service } from "elumian/core/decorators";
import { Elumian } from "elumian/core";

@Service
export class Category {
  async addCategory(data: {
    name: string;
    accountId: string;
    transactionTypeId: string;
    currencyId: string;
    userId: string;
  }) {
    const result = await Elumian.prisma.category.create({
      data: {
        name: data.name,
        accountId: data.accountId ? Number(data.accountId) : data.accountId,
        transaction_typeId: Number(data.transactionTypeId),
        currencyId: data.currencyId ? Number(data.currencyId) : data.currencyId,
        userId: data.userId,
      },
    });
    return {
      status: 200,
      data: result,
    };
  }
  async getCategory(data: { userId: string; transactionTypeId: string }) {
    const result = await Elumian.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        account: true,
      },
      where: {
        userId: data.userId,
        transaction_typeId: Number(data.transactionTypeId),
      },
    });
    return {
      status: 200,
      data: result,
    };
  }
  async getAccounts() {
    const result = await Elumian.prisma.account.findMany({
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
  async getTransactionType() {
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
