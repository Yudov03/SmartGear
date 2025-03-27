import { Body, Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildDto } from './dto';

@Controller('build')
export class BuildController {
    constructor(private buildService: BuildService) {}

    // http://localhost:3000/build/engine (body is dto)
    @Get('engine')
    calculateEngine(@Body() dto: BuildDto) {
        return this.buildService.calculateEngine(dto)
    }
    
    // http://localhost:3000/build/1 (body is dto)
    @Get(':id')
    transmissionRate(@Param('id', ParseIntPipe) engineId: number, @Body() dto: BuildDto) {
        return this.buildService.transmissionRate(engineId, dto)
    }
}