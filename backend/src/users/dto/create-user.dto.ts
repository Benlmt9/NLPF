import { IsEmail, IsNotEmpty, IsAscii, IsEmpty, IsIn} from 'class-validator';
import { USER_TYPE } from '../entities/user.entity';


export class CreateUserDto {
    @IsNotEmpty()
    @IsAscii()
    firstname: string;

    @IsNotEmpty()
    @IsAscii()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsIn(USER_TYPE)
    type: string;

    @IsEmpty()
    tokenHash : string;
}
