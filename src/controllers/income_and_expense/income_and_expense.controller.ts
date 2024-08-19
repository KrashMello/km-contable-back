import {
  Controller,
  Post,
  DataEntryGuard,
  ProtecteGuard,
  CatchErrors,
  Get,
} from "elumian/core/decorators";
import { type Request, type Response } from "express";
import { IncomeAndExpensesDataRequest } from "./income_and_expense.request";
import { Elumian } from "elumian/core";

@Controller("/account")
export class IncomeAndExpensesController {
  @Post("/")
  @ProtecteGuard()
  @DataEntryGuard(IncomeAndExpensesDataRequest)
  @CatchErrors
  async addAccount(req: Request, res: Response): Promise<any> {
    const data = req.body;
    data.userId = Elumian.crypto.hardDecrypt(
      Elumian.cache.list.Auth.find(
        (data) => data.id === req.header("x-access-id"),
      ).data,
    ).id;
    const result = await Elumian.Account.addAccount(data);
    res.status(result.status).json(result.data);
  }
  @Get("/")
  @ProtecteGuard()
  @CatchErrors
  async getAll(req: Request, res: Response): Promise<any> {
    const data = {
      id: Elumian.crypto.hardDecrypt(
        Elumian.cache.list.Auth.find(
          (data: any) => data.id === req.header("x-access-id"),
        ).data,
      ).id,
    };
    const result = await Elumian.Account.getAll(data);
    res.status(result.status).json(result.data);
  }
}
