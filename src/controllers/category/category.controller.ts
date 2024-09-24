import {
  Controller,
  Post,
  DataEntryGuard,
  ProtecteGuard,
  CatchErrors,
  Get,
} from "elumian/core/decorators";
import { type Request, type Response } from "express";
import { Elumian } from "elumian/core";
import { CategoryDataRequest } from "./categroy.request";

@Controller("/category")
export class CategoryController {
  @Post("/")
  @ProtecteGuard()
  @DataEntryGuard(CategoryDataRequest)
  @CatchErrors
  async addCategory(req: Request, res: Response): Promise<any> {
    const data = req.body;
    data.userId = Elumian.crypto.hardDecrypt(
      Elumian.cache.list.Auth.find(
        (data: any) => data.id === req.header("x-access-id"),
      ).data,
    ).id;
    const result = await Elumian.Category.addCategory(data);
    res.status(result.status).json(result.data);
  }

  @Get("/")
  @ProtecteGuard()
  @CatchErrors
  async getCategory(req: Request, res: Response): Promise<any> {
    const data = {
      userId: Elumian.crypto.hardDecrypt(
        Elumian.cache.list.Auth.find(
          (data: any) => data.id === req.header("x-access-id"),
        ).data,
      ).id,
      transactionTypeId: req.query.transactionType,
    };
    const result = await Elumian.Category.getCategory(data);
    res.status(result.status).json(result.data);
  }
  @Get("/currency")
  @ProtecteGuard()
  @CatchErrors
  async getTypes(req: Request, res: Response): Promise<any> {
    const result = await Elumian.Category.getCurrency();
    res.status(result.status).json(result.data);
  }

  @Get("/account")
  @ProtecteGuard()
  @CatchErrors
  async getAccount(req: Request, res: Response): Promise<any> {
    const result = await Elumian.Category.getAccounts();
    res.status(result.status).json(result.data);
  }

  @Get("/transactionType")
  @ProtecteGuard()
  @CatchErrors
  async getTransactionType(req: Request, res: Response): Promise<any> {
    const result = await Elumian.Category.getTransactionType();
    res.status(result.status).json(result.data);
  }
}
