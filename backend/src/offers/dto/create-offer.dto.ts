import {IsNotEmpty, IsAscii, IsOptional, IsIn, IsDateString} from 'class-validator';
import { OFFER_STATE } from '../entities/offer.entity';

export enum REMOTE_STATE { 
    'FULL',
    'SEMI',
    'NO'
};

const offerStateValueArray = Object.values(OFFER_STATE);
const offersRemoteValueArray = Object.values(REMOTE_STATE);

export class CreateOfferDto {
    @IsNotEmpty()
    @IsAscii()
    title: string;

    @IsNotEmpty()
    @IsAscii()
    description: string;

    @IsOptional()
    ownerId?: string;

    @IsOptional()
    quizId?: string;

    @IsIn(offerStateValueArray)
    state: string;

    @IsIn(offersRemoteValueArray)
    remote: string;

    @IsNotEmpty()
    city: string;

    @IsDateString()
    date: Date;
}
