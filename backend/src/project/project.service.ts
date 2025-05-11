import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProjectDto, EditProjectDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  getProjects(userId: number) {
    return this.prisma.project.findMany({
      where: {
        userId,
      },
    });
  }

  getProjectById(userId: number, projectId: number) {
    return this.prisma.project.findFirst({
      where: {
        id: projectId,
        userId,
      },
    });
  }

  async createProject(userId: number, dto: CreateProjectDto) {
    console.log('test', dto, userId);
    await this.prisma.project.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async editProjectById(
    userId: number,
    projectId: number,
    dto: EditProjectDto,
  ) {
    // get the project by id
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    // check if user owns the project
    if (!project || project.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteProjectById(userId: number, projectId: number) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    // check if user owns the project
    if (!project || project.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.project.delete({
      where: {
        id: projectId,
      },
    });
  }
}
