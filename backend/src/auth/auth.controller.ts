import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/local/signup')
    async signupLocal(@Body() authDto: AuthDto): Promise<Tokens>{
        return await this.authService.signupLocal(authDto);
    }

    @Post('/local/signin')
    async signinLocal(@Body() authDto: AuthDto) : Promise<Tokens>{
        return this.authService.signinLocal(authDto);
        
    }

    @Post('/logout')
    logout() {
        this.authService.logout();
        
    }

    @Post('/refresh')
    refreshTokens() {
        this.authService.refreshTokens();
        
    }
}