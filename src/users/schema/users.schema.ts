import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  id: number;
  @Prop({default: [Role.User]})
  roles: Role[];
};

export const UsersSchema = SchemaFactory.createForClass(Users);
