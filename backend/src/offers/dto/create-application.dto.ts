import {IsNotEmpty, IsOptional, IsMongoId, IsNumberString, IsString} from 'class-validator';


export class CreateApplicationDto {
    @IsString()
    message: string;

    @IsOptional()
    candidateId?: string;

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

    @IsOptional()
    @IsMongoId()
    choosenCandidate?: string;

    @IsOptional()
    @IsMongoId()
    applicationId: string;
}
