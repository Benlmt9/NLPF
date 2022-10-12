import { IsNotEmpty, IsOptional } from "class-validator";

export class SubmitQuizzDto{
    
    @IsNotEmpty()
    quizId: string;
    
    @IsOptional()
    candidateId?: string;

    @IsNotEmpty()
    questionsIds:  string[];

    @IsNotEmpty()
    answers:  string[];
}