import { AccountController } from "../controllers/account/account.controller";
import { AuthController } from "../controllers/auth/auth.controller";
import { Auth } from "../services/auth.service";
import { Account } from "../services/Acounts.service";
import { TransactionController } from "../controllers/transaction/transaction.controller";
import { Transaction } from "../services/transaction.service";

export default {
  controllers: [AuthController, AccountController, TransactionController],
  services: [Auth, Account, Transaction],
};
