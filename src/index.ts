import { Server } from "elumian/core";
import { modules } from "./modules";
Server.setConfig({
	port: 3000,
});
Server.setRedisProvider({
	url: "redis://:@localhost:6379",
});
Server.chargeModules(modules);
Server.start();
