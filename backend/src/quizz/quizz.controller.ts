import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { CreateQuestionDto } from './dto/update-quizz.dto';

@Controller('quizz')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @Post()
  async create(@Body() createQuizzDto: CreateQuizzDto) {
    return this.quizzService.create(createQuizzDto);
  }

  @Patch(':quizzId')
  async update(@Param('quizzId') quizzId: string, @Body() createQuestionDto : CreateQuestionDto) {
    return this.quizzService.update(quizzId, createQuestionDto);
  }

  @Get()
  findAll() {
    return this.quizzService.findAll();
  }

  @Get(':quizzId')
  findOne(@Param('quizzId') quizzId: string) {
    return this.quizzService.findOne(quizzId);
  }
}
