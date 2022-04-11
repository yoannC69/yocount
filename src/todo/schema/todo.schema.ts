import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Users } from 'src/users/schema/users.schema';


export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'Users'})
  user: Users
};

export const TodoSchema = SchemaFactory.createForClass(Todo);
