import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { Question, QuizResponse, Quizz } from 'src/schemas/quizz.schema';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { SubmitQuizzDto } from './dto/submit-quizz.dto';
import { CreateQuestionDto } from './dto/update-quizz.dto';

@Injectable()
export class QuizzService {

  private readonly logger = new Logger(QuizzService.name);
  
  constructor(@InjectModel(Quizz.name) private quizzModel: Model<Quizz>,
  @InjectModel(Question.name) private questionModel : Model<Question>,
  @InjectModel(QuizResponse.name) private quizResponseModel : Model<QuizResponse>) {}

  async findAllById(companyId: string) {
    return await this.quizzModel.find({ ownerId : companyId}).exec();
  }
  
  findAll() {
    return this.quizzModel.find();
  }

  async findOne(id: string) {
    return await this.quizzModel.findById({_id : id});

  }

  async compute(questionsIds : string[], answers: string[]){
    console.log("compute() avec: ", questionsIds, answers);
    
    if (questionsIds.length != answers.length){
      throw new BadRequestException("Cannot compute score with questionsIds[] and answers[] with different length")
    }

    let score = 0;

    for (let i = 0; i < questionsIds.length; i++ ){

      const currentQuestion = await this.questionModel.findById({_id : questionsIds[i]});
      const currentAnswer = answers[i];
      
      console.log("the questione ! ", currentQuestion);

      if (currentQuestion.validAnswer == currentAnswer){
        score++;
      }
    }

    return score;
  }

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

  
  async submitQuizz(submitQuizzDto: SubmitQuizzDto) {

    //compute score
    const quizScore = await this.compute(submitQuizzDto.questionsIds, submitQuizzDto.answers);

    console.log("score: ", quizScore);

    //create quizResponse document and save it 
    const createdQuizResponse = new this.quizResponseModel({...submitQuizzDto, score: quizScore});//new this.quizzModel({...createQuizzDto});
    const res = await createdQuizResponse.save(); 
    
    //return 
    return res;
  }
}
