import {IsNotEmpty, IsAscii, IsOptional, IsIn, IsMongoId, IsInt, IsDate, IsNumber, IsNumberString} from 'class-validator';
import { OFFER_STATE } from '../entities/offer.entity';

export class CreateApplicationDto {
    @IsAscii()
    message: string;

    @IsNotEmpty()
    candidateId: string;

    @IsOptional()
    @IsMongoId()
    quizResponseId?: string;

    @IsOptional()
    @IsNumberString()
    score?: Number;
}
