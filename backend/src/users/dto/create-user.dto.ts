import { IsEmail, IsNotEmpty, IsAscii, IsEmpty, IsIn, IsNumberString, IsOptional} from 'class-validator';
import { USER_TYPE } from '../entities/user.entity';

const userTypeValueArray = Object.values(USER_TYPE)

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    siret: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsIn(userTypeValueArray)
    type: string;

    @IsEmpty()
    tokenHash : string;

}
