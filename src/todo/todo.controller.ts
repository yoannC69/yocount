import { Body, Controller, Get, Param, Post, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/todo.dto';
import { Todo } from './schema/todo.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param() params): Promise<Todo> {
    return this.todoService.getTodoById(params.id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateTodo(@Body() createTodoDto: CreateTodoDto, @Param() params): Promise<Todo> {
    return this.todoService.updateTodo(params.id, createTodoDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto, @Request() req): Promise<Todo> {
    return this.todoService.createTodo(createTodoDto, req.user.userId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteTodo(@Param() params): Promise<Todo> {
    return this.todoService.deleteTodo(params.id);
  }
}
