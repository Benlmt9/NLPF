import { IsEmail, IsNotEmpty, IsAscii, IsEmpty} from 'class-validator';

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

    @IsEmpty()
    tokenHash : string;
}
