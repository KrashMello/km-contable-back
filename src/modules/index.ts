import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
// import { WalletsModule } from "./wallets/wallets.module";

export const modules = [
	UsersModule,
	// WalletsModule,
	AuthModule,
];
