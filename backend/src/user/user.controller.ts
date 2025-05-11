import {
    Body,
    Controller,
    Get,
    Patch,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { EditPasswordDto } from './dto/edit-password.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // http://localhost:3000/users/me (Header Beare token)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  // PATCH http://localhost:3000/users/1 (Header Beare token, Body dto)
  @HttpCode(HttpStatus.OK)
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  // PATCH http://localhost:3000/users/password (Header Bearer token, Body dto)
  @HttpCode(HttpStatus.OK)
  @Patch('password')
  editPassword(@GetUser('id') userId: number, @Body() dto: EditPasswordDto) {
    return this.userService.editPassword(userId, dto);
  }
}
