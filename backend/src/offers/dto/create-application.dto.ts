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

export class UpdateApplicationDto {
    @IsNotEmpty()
    state: string;

    @IsOptional()
    reason?: string;

    @IsMongoId()
    applicationId: string;
}
