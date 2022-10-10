import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema()
export class Question extends Document{

  @Prop()
  label: string;
  
  @Prop([String])
  answers: string[];

  @Prop()
  validAnswer: string;
  
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema()
export class Quizz extends Document{

  @Prop()
  name: string;

  @Prop()
  ownerId: string; // sould be a COMPANY

  @Prop({ type: [{ type: QuestionSchema, ref: 'Question' }] })
  questions: Question[];

}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);


@Schema()
export class QuizResponse extends Document{

  @Prop()
  candidateId: string;
  
  @Prop()
  quizId: string;
  
  @Prop()
  score: string;
  
  @Prop([String])
  questionsIds: string[];

  @Prop([String])
  answers: string[];

}

export const QuizResponseSchema = SchemaFactory.createForClass(QuizResponse);
