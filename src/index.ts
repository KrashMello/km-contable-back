import modules from "./modules/index";
import { server } from "elumian/server";
const whiteList = ["http://localhost:3000"];
server({
  controllers: modules.controllers,
  services: modules.services,
  whiteList,
  port: 5000,
});
