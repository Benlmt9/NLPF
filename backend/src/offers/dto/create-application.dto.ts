import {IsNotEmpty, IsAscii, IsOptional, IsIn, IsMongoId, IsInt, IsDate} from 'class-validator';
import { OFFER_STATE } from '../entities/offer.entity';

class QuizSummary {
    @IsNotEmpty()
    @IsMongoId()
    quizResultId: string;

    @IsNotEmpty()
    @IsInt()
    score: Number;

    @IsNotEmpty()
    @IsInt()
    timeSeconds: Number;
}

export class CreateApplicationDto {
    @IsAscii()
    message: string;

    @IsNotEmpty()
    candidateId: string;

    //state?

    @IsOptional()
    quiz: QuizSummary;
}
