import { Module } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { QuizzController } from './quizz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema, Quizz, QuizzSchema } from 'src/schemas/quizz.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Quizz.name, schema: QuizzSchema }]),
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])
  ],
  controllers: [QuizzController],
  providers: [QuizzService]
})
export class QuizzModule {}
