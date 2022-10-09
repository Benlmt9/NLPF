import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzDto } from './create-quizz.dto';

export class CreateQuestionDto extends PartialType(CreateQuizzDto) {
    answers:  string[];
    validAnswer: string;
    label: string;
}
