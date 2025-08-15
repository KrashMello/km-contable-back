import { Module } from "elumian/common/decorators";
import { PrismaService } from "./prisma.service";

@Module({
	services: [PrismaService],
})
export class PrismaModule {}
