import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Offer extends Document{

  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true})
  ownerId : string;

  @Prop({nullable : true})
  quizId?: string;

  @Prop({required: true})
  state: string;

  @Prop({required: true})
  remote: string;

  @Prop({required: true})
  city: string;

  @Prop({required: true})
  date: Date;

  @Prop([String])
  rejectedApplications: string[];
  
  @Prop(raw({
    candidateId: { type: String },
    quizResponseId: { type: String },
    message: { type: String },
    applicationId: { type: String },
    score: { type: String }
  }))
    applications: Record<string, any>[];
  
}


export const OffersSchema = SchemaFactory.createForClass(Offer);
