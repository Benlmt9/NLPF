import {IsNotEmpty, IsAscii, IsOptional, IsIn} from 'class-validator';
import { OFFER_STATE } from '../entities/offer.entity';

export class CreateOfferDto {
    @IsNotEmpty()
    @IsAscii()
    title: string;

    @IsNotEmpty()
    @IsAscii()
    description: string;

    @IsNotEmpty()
    ownerId: string;

    @IsNotEmpty()
    quizId: string;

    @IsIn(OFFER_STATE)
    state: string;
}
