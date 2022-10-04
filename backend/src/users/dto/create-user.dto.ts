import { IsEmail, IsNotEmpty, IsAscii, IsEmpty, IsIn} from 'class-validator';
import { USER_TYPE } from '../entities/user.entity';


export class CreateUserDto {
    @IsNotEmpty()
    @IsAscii()
    name: string;

    siret: string;

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
