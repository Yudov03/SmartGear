import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ProjectService } from './project.service';
import { CreateProjectDto, EditProjectDto } from './dto';

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  // GET http://localhost:3000/projects (Header Beare token)
  @Get()
  getProjects(@GetUser('id') userId: number) {
    return this.projectService.getProjects(userId);
  }

  // GET http://localhost:3000/projects/1 (Header Beare token)
  @Get(':id')
  getProjectById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.getProjectById(userId, projectId);
  }

  // POST http://localhost:3000/projects (Header Beare token, Body dto)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProject(@GetUser('id') userId: number, @Body() dto: CreateProjectDto) {
    return this.projectService.createProject(userId, dto);
  }

  // PATCH http://localhost:3000/projects/1 (Header Beare token, Body dto)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  editProjectById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: EditProjectDto,
  ) {
    return this.projectService.editProjectById(userId, projectId, dto);
  }

  // DELETE http://localhost:3000/projects/1 (Header Beare token)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteProjectById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.deleteProjectById(userId, projectId);
  }
}
