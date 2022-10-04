import {IsNotEmpty, IsAscii, IsOptional, IsIn, IsMongoId} from 'class-validator';
import { USER_TYPE } from '../../users/entities/user.entity';

export enum OFFER_STATE { 
    'OPEN',
    'CLOSED',
    'HIDDEN'
};

const userTypeValueArray = Object.values(USER_TYPE)

export class FindOffersFilter {
    @IsIn(userTypeValueArray)
    @IsNotEmpty()
    type : string;
    
    @IsMongoId()
    @IsOptional()
    id? : string;
  };
  
export class Offer {}
