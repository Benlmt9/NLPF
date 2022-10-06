import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, AuthSignInDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('local/signup')
    async signupLocal(@Body() authDto: AuthDto): Promise<Tokens>{
        return await this.authService.signupLocal(authDto);
    }

    @Post('local/signin')
    async signinLocal(@Body() authSignInDto: AuthSignInDto) : Promise<Tokens>{
        return this.authService.signinLocal(authSignInDto);
        
    }

    //TODO checker a chaque fois si le user a toujours son tokenHash dans la table, sinon le acces token recu dans le Header vaut rien car
    //cela signifie que le mec s'était logout, donc il doit regenerer un accestoken & refreshtoken en allant se Signin de nouveau 
    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    logout(@Req() req: Request) {
        const user = req.user;

        console.log(user);

        return this.authService.logout(user["sub"]);
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    refreshTokens() {
        this.authService.refreshTokens();
    }
}