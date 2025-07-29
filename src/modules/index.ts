import { AuthModule } from "./auth/auth.module";
import { CurrenciesModule } from "./currencies/currencies.module";
import { UsersModule } from "./users/users.module";
import { WalletsModule } from "./wallets/wallets.module";

export const modules = [
	AuthModule,
	UsersModule,
	WalletsModule,
	CurrenciesModule,
];
