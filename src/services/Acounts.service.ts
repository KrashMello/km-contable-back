import { Service } from "elumian/core/decorators";
import { Elumian } from "elumian/core";

@Service
export class Account {
  async addAccount(data: {
    name: string;
    account_type: number;
    currency: number;
    userId: string;
  }) {
    const accountData = await Elumian.prisma.account.create({
      data: {
        name: data.name,
        account_typeId: Number(data.account_type),
        currencyId: Number(data.currency),
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
}
