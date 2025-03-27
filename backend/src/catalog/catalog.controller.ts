import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalogs')
export class CatalogController {
    constructor(private catalogService: CatalogService) {}

    // http://localhost:3000/catalogs/engine/1
    @Get('engine/:id')
    getEngineById(@Param('id', ParseIntPipe) catalogId: number) {
        return this.catalogService.getEngineById(catalogId);
    }

    // http://localhost:3000/catalogs/engine
    @Get('engine')
    getEngines() {
        return this.catalogService.getEngines();
    }
}
