import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/users.dto';
import { Users } from './schema/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getById(@Param() params): Promise<Users> {
    return this.usersService.getUsersById(params.id);
  }
  @Put(':id')
  updateUser(@Body() createUsersDto: CreateUsersDto, @Param() params): Promise<Users> {
    return this.usersService.updateUser(params.id, createUsersDto);
  }

  @Post()
  createMessage(@Body() createUsersDto: CreateUsersDto): Promise<Users> {
    return this.usersService.createUser(createUsersDto);
  }

  @Delete(':id')
  deleteMessage(@Param() params): Promise<Users> {
    return this.usersService.deleteUser(params.id);
  }
}
