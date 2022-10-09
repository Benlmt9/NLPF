import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { Question, Quizz } from 'src/schemas/quizz.schema';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { CreateQuestionDto } from './dto/update-quizz.dto';

@Injectable()
export class QuizzService {

  private readonly logger = new Logger(QuizzService.name);

  constructor(@InjectModel(Quizz.name) private quizzModel: Model<Quizz>,
  @InjectModel(Question.name) private questionModel : Model<Question>) {}

  async create(createQuizzDto: CreateQuizzDto) {
    const createdQuizz = new this.quizzModel({...createQuizzDto});
    const res = await createdQuizz.save(); 
    return res;
  }

  async update(id: string, createQuestionDto: CreateQuestionDto) {
    console.log(createQuestionDto);
        
    const newQuestion = new this.questionModel({...createQuestionDto});

    console.log(newQuestion);

    const updateParams = {
      $push: {
        questions:
          newQuestion
      }
    };

    const updated = await this.quizzModel.updateOne(
      {_id : id},
      updateParams
      );

    return updated;
  }


  findAll() {
    return this.quizzModel.find();
  }

  findOne(id: string) {
    return this.quizzModel.findById({_id : id});

  }


  remove(id: number) {
    return `This action removes a #${id} quizz`;
  }
}
