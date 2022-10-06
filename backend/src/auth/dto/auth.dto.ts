import { IsEmail, IsEmpty, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

import { USER_TYPE } from "src/users/entities/user.entity";

const userTypeValueArray = Object.values(USER_TYPE)


export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    siret?: string;

    @IsNotEmpty()
    @IsIn(userTypeValueArray)
    type: string;

    @IsEmpty()
    tokenHash : string;

    @IsOptional()
    @IsNumberString()
    avatarId: string;


}



