import {
  Controller,
  Post,
  DataEntryGuard,
  ProtecteGuard,
  CatchErrors,
  Get,
  Put,
} from "elumian/core/decorators";
import { type Request, type Response } from "express";
import { accountDataRequest } from "./account.request";
import { Elumian } from "elumian/core";

@Controller("/account")
export class AccountController {
  @Post("/")
  @ProtecteGuard()
  @DataEntryGuard(accountDataRequest)
  @CatchErrors
  async addAccount(req: Request, res: Response): Promise<any> {
    const data = req.body;
    data.userId = Elumian.crypto.hardDecrypt(
      Elumian.cache.list.Auth.find(
        (data) => (data.id = req.header("x-access-id")),
      ).data,
    ).id;
    const result = await Elumian.Account.addAccount(data);
    res.status(result.status).json(result.data);
  }
  @Put("/")
  @ProtecteGuard()
  @DataEntryGuard(accountDataRequest)
  @CatchErrors
  async updateAccount(req: Request, res: Response): Promise<any> {
    const data = req.body;
    data.userId = Elumian.crypto.hardDecrypt(
      Elumian.cache.list.Auth.find(
        (data) => (data.id = req.header("x-access-id")),
      ).data,
    ).id;
    const result = await Elumian.Account.updateAccount(data);
    res.status(result.status).json(result.data);
  }
  @Get("/")
  @ProtecteGuard()
  @CatchErrors
  async getAll(req: Request, res: Response): Promise<any> {
    const data = {
      id: Elumian.crypto.hardDecrypt(
        Elumian.cache.list.Auth.find(
          (data: any) => (data.id = req.header("x-access-id")),
        ).data,
      ).id,
    };
    const result = await Elumian.Account.getAll(data);
    res.status(result.status).json(result.data);
  }
  @Get("/currency")
  @ProtecteGuard()
  @CatchErrors
  async getCurrency(req: Request, res: Response): Promise<any> {
    const data = {
      id: Elumian.crypto.hardDecrypt(
        Elumian.cache.list.Auth.find(
          (data: any) => (data.id = req.header("x-access-id")),
        ).data,
      ).id,
    };
    const result = await Elumian.Account.getCurrency();
    res.status(result.status).json(result.data);
  }
  @Get("/types")
  @ProtecteGuard()
  @CatchErrors
  async getAllTypes(req: Request, res: Response): Promise<any> {
    const result = await Elumian.Account.getAllTypes();
    res.status(result.status).json(result.data);
  }
}
