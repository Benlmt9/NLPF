import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { CreateQuestionDto } from './dto/update-quizz.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SubmitQuizzDto } from './dto/submit-quizz.dto';

@Controller('quizz')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Req() req: Request, @Body() createQuizzDto: CreateQuizzDto) {
    const companyId = req.user["sub"];
    return this.quizzService.create({...createQuizzDto, ownerId: companyId});
  }

  @Patch(':quizzId')
  async update(@Param('quizzId') quizzId: string, @Body() createQuestionDto : CreateQuestionDto) {
    return this.quizzService.update(quizzId, createQuestionDto);
  }

  @Get()
  findAll() {
    return this.quizzService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('company/all')
  async findAllCompany(@Req() req: Request) {
    const companyId = req.user["sub"];
    return await this.quizzService.findAllById(companyId);
  }

  @Get(':quizzId')
  async findOne(@Param('quizzId') quizzId: string) {
    return await this.quizzService.findOne(quizzId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('submit')
  async submitQuizResponses(@Req() req: Request, @Body() submitQuizzDto: SubmitQuizzDto) {
    const candidateId = req.user["sub"];
    return this.quizzService.submitQuizz({...submitQuizzDto, candidateId});
  }
}
