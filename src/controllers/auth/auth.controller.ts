import {
  Controller,
  Post,
  DataEntryGuard,
  CatchErrors,
} from "elumian/core/decorators";
import { type Request, type Response } from "express";
import { loginDataRequest } from "./auth.request";
import { Elumian } from "elumian/core";

@Controller("/auth")
export class AuthController {
  @Post("/login")
  @DataEntryGuard(loginDataRequest)
  @CatchErrors
  async login(req: Request, res: Response): Promise<any> {
    const data = req.body;
    res.json(await Elumian.Auth.login(data));
  }
}
