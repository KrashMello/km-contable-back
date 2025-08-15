import { AccountTypesModule } from "./account_types/account_types.module";
import { ApiKeysModule } from "./api_keys/api_keys.modules";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { CurrenciesModule } from "./currencies/currencies.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TransactionModule } from "./transaction/transaction.module";
import { TransactionTypesModule } from "./transaction_types/transaction_types.module";
import { UsersModule } from "./users/users.module";
import { WalletsModule } from "./wallets/wallets.module";

export const modules = [
	AuthModule,
	UsersModule,
	WalletsModule,
	CurrenciesModule,
	AccountTypesModule,
	CategoriesModule,
	TransactionTypesModule,
	TransactionModule,
	ApiKeysModule,
	PrismaModule,
];
