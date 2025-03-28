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

    //TODO
    // getBearings() {}
    getBearing() {
        return this.prisma.bearing.findMany();
    }


    // getBearingById() {}
    getBearingById(catalogId: number) {
        console.log(catalogId)
        return this.prisma.bearing.findFirst({
            where: {
                id: catalogId,
            }
        });
    }

}
