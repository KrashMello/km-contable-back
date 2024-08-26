import { AccountController } from "../controllers/account/account.controller";
import { AuthController } from "../controllers/auth/auth.controller";
import { Auth } from "../services/auth.service";
import { Account } from "../services/Acounts.service";
import { IncomeAndExpensesController } from "../controllers/income_and_expense/income_and_expense.controller";
import { IncomeAndExpenses } from "../services/income_and_expense.service";

export default {
  controllers: [AuthController, AccountController, IncomeAndExpensesController],
  services: [Auth, Account, IncomeAndExpenses],
};
