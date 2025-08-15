import { PrismaClient } from "@prisma/client";
import { Service } from "elumian/common/decorators";

@Service()
export class PrismaService extends PrismaClient {}
