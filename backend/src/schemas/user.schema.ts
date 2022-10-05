import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//export type UserDocument = User & Document;

@Schema()
export class User extends Document{
  @Prop({required: true,})
  name: string;
  
  @Prop({nullable : true})
  siret?: string;
  
  @Prop({
    required: true,
    index: true,
    unique: true
})

  email : string;

  @Prop({required: true,})
  passwordHash: string;

  @Prop({required: true})
  type: string;

  @Prop({ nullable: true })
  tokenHash?: string;

  @Prop({ nullable: true })
  avatarId?: string;
}


export const UserSchema = SchemaFactory.createForClass(User);
