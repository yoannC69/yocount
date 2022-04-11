import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schema/todo.schema';
import { CreateTodoDto } from './dto/todo.dto';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class TodoService {

  constructor(@InjectModel(Todo.name) private TodoModel: Model<TodoDocument>) {}

  async findAll(): Promise<Todo[]> {
    return this.TodoModel.find().populate("user").exec();
  }

  async createTodo(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const createdTodo = new this.TodoModel({...createTodoDto, user: userId});
    return createdTodo.save();
  }

  async getTodoById(id: string): Promise<Todo> {
    return this.TodoModel.findById(id)
  }

  async updateTodo(id: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.TodoModel.findByIdAndUpdate(id, createTodoDto)
  }
  async deleteTodo(id: string): Promise<Todo> {
    return this.TodoModel.findByIdAndDelete(id)
  }
}