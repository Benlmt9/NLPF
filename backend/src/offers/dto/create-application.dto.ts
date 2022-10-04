import {IsNotEmpty, IsAscii, IsOptional, IsMongoId, IsNumberString} from 'class-validator';


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
