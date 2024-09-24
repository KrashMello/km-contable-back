import { AccountController } from "../controllers/account/account.controller";
import { AuthController } from "../controllers/auth/auth.controller";
import { Auth } from "../services/auth.service";
import { Account } from "../services/Acounts.service";
import { TransactionController } from "../controllers/transaction/transaction.controller";
import { Transaction } from "../services/transaction.service";
import { CategoryController } from "../controllers/category/category.controller";
import { Category } from "@/services/category.service";

export default {
  controllers: [
    AuthController,
    AccountController,
    TransactionController,
    CategoryController,
  ],
  services: [Auth, Account, Transaction, Category],
};
