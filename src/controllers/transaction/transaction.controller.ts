import {
  Controller,
  Post,
  DataEntryGuard,
  ProtecteGuard,
  CatchErrors,
  Get,
} from "elumian/core/decorators";
import { type Request, type Response } from "express";
import { TransactionDataRequest } from "./transaction.request";
import { Elumian } from "elumian/core";

@Controller("/transaction")
export class TransactionController {
  @Post("/")
  @ProtecteGuard()
  @DataEntryGuard(TransactionDataRequest)
  @CatchErrors
  async addTransaction(req: Request, res: Response): Promise<any> {
    const data = req.body;
    const result = await Elumian.Transaction.addTransaction(data);
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
    const result = await Elumian.Transaction.getAllIncomes(data);
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
    const result = await Elumian.Transaction.getAllExpenses(data);
    res.status(result.status).json(result.data);
  }
  @Get("/types")
  @ProtecteGuard()
  @CatchErrors
  async getTypes(req: Request, res: Response): Promise<any> {
    const result = await Elumian.category.getTransacctionType();
    res.status(result.status).json(result.data);
  }
  @Get("/getAllMounts")
  @ProtecteGuard()
  @CatchErrors
  async getAllMounts(req: Request, res: Response): Promise<any> {
    const data = {
      id: Elumian.crypto.hardDecrypt(
        Elumian.cache.list.Auth.find(
          (data: any) => data.id === req.header("x-access-id"),
        ).data,
      ).id,
    };
    const result = await Elumian.Transaction.getAllMounts(data);
    res.status(result.status).json(result.data);
  }
}
