import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Offer extends Document{

  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop()
  ownerID : string;

  @Prop()
  quizId: string;

  @Prop()
  state: string;


  @Prop(raw({
    candidateId: { type: String },
    quizResponseId: { type: String },
    message: { type: String },
    state: { type: String }
  }))
    applications: Record<string, any>[];
  
}


export const OffersSchema = SchemaFactory.createForClass(Offer);
