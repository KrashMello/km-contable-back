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
    const accountData = await Elumian.prisma.account.create({
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
        message: accountData,
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
    const accountData = await Elumian.prisma.account.update({
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
        message: accountData,
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
