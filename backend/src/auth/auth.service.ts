import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(@InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService) {}


    hashData(data: string){
        return bcrypt.hash(data, 10);
    }

    async getTokens(userId: string, email: string){
        const [accesToken, refreshToken] = await Promise.all(
            [
                this.jwtService.signAsync(
                    {
                        sub: userId,
                        email,
                    },
                    {
                        secret: 'at-secret', // TODO remplace
                        expiresIn: 60*15, //15 min
                    }
                ),
                this.jwtService.signAsync(
                    {
                        sub: userId,
                        email,
                    },
                    {
                        secret: 'rt-secret', // TODO remplace
                        expiresIn: 60*60*24*7, //1 week
                    }
                )
            ]
        );

        return { accesToken, refreshToken };

    }


    async updateRtHash(userId: string, refreshToken: string){
        const newTokenHash = await this.hashData(refreshToken);
        
        const temp = {modifiedCount: "", truc: ""}; //update user (where _id==userId) hashToken with the newTokenHash
        
        return temp.modifiedCount === "1";
    }


    async signupLocal(authDto: AuthDto) : Promise<Tokens> {

        const passwordHash = await this.hashData(authDto.password);

        // TODO authDto => ajotuer les champs requis par mongo db du User schema (comme createuserdto)
        // TODO check que le user exist pas déjà pour eviter une erreur mongo db qui stop le back..

        const newUser = await new this.userModel({...authDto, passwordHash});
        newUser.save();

        const tokens = await this.getTokens(newUser._id, newUser.email);

        return tokens;

    }


    
    signinLocal() {
        
    }

    logout() {
        
    }

    refreshTokens() {
        
    }

}
