import {IsNotEmpty, IsAscii, IsOptional, IsIn} from 'class-validator';
import { OFFER_STATE } from '../entities/offer.entity';

const offerStateValueArray = Object.values(OFFER_STATE);

export class CreateOfferDto {
    @IsNotEmpty()
    @IsAscii()
    title: string;

    @IsNotEmpty()
    @IsAscii()
    description: string;

    @IsNotEmpty()
    ownerId: string;

    @IsOptional()
    quizId?: string;

    @IsIn(offerStateValueArray)
    state: string;
}
