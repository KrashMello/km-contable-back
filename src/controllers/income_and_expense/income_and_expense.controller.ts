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

@Controller("/incomesAndExpenses")
export class IncomeAndExpensesController {
  @Post("/")
  @ProtecteGuard()
  @DataEntryGuard(IncomeAndExpensesDataRequest)
  @CatchErrors
  async addIncomeOrExpense(req: Request, res: Response): Promise<any> {
    const data = req.body;
    const result = await Elumian.IncomeAndExpenses.addIncomeOrExpense(data);
    res.status(result.status).json(result.data);
  }
  @Get("/getAllIncomes")
  @ProtecteGuard()
  @CatchErrors
  async getAllIncomes(req: Request, res: Response): Promise<any> {
    const data = {
      id: Elumian.crypto.hardDecrypt(
        Elumian.cache.list.Auth.find(
          (data: any) => data.id === req.header("x-access-id"),
        ).data,
      ).id,
    };
    const result = await Elumian.IncomeAndExpenses.getAllIncomes(data);
    res.status(result.status).json(result.data);
  }
  @Get("/getAllExpenses")
  @ProtecteGuard()
  @CatchErrors
  async getAllExpenses(req: Request, res: Response): Promise<any> {
    const data = {
      id: Elumian.crypto.hardDecrypt(
        Elumian.cache.list.Auth.find(
          (data: any) => data.id === req.header("x-access-id"),
        ).data,
      ).id,
    };
    const result = await Elumian.IncomeAndExpenses.getAllExpenses(data);
    res.status(result.status).json(result.data);
  }
  @Get("/types")
  @ProtecteGuard()
  @CatchErrors
  async getTypes(req: Request, res: Response): Promise<any> {
    const result = await Elumian.IncomeAndExpenses.getTypes();
    res.status(result.status).json(result.data);
  }
}
