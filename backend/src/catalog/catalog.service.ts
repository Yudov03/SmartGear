import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CatalogService {
    constructor(private prisma: PrismaService) {}

    getEngines() {
        return this.prisma.engine.findMany();
    }

    getEngineById(catalogId: number) {
        console.log(catalogId)
        return this.prisma.engine.findFirst({
            where: {
                id: catalogId,
            }
        });
    }
}
