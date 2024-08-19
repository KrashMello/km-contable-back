import { AccountController } from "../controllers/account/account.controller";
import { AuthController } from "../controllers/auth/auth.controller";
import { Auth } from "../services/auth.service";
import { Account } from "../services/Acounts.service";

export default {
  controllers: [AuthController, AccountController],
  services: [Auth, Account],
};
