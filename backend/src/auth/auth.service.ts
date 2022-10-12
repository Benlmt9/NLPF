import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { AuthDto, AuthSignInDto } from './dto';
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
                        expiresIn: 60*60, //60 min
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
        
        if (!Types.ObjectId.isValid(userId))
            throw new BadRequestException("Bad id");
        const res = await this.userModel.updateOne({_id : userId}, {tokenHash: newTokenHash});
      
        if (!res)
            throw new BadRequestException("User update failed"); 
      
    }


    async signupLocal(authDto: AuthDto) : Promise<Tokens> {

        const passwordHash = await this.hashData(authDto.password);

        const newUser = await new this.userModel({...authDto, passwordHash});

        try { 
            await newUser.save();
        } catch (error){
            throw new ForbiddenException(`Can not save this user, MongoDb error code: ${error.code}` );
        }

        const tokens = await this.getTokens(newUser._id, newUser.email);
        
        await this.updateRtHash(newUser._id, tokens.refreshToken);

        return tokens;

    }


    
    async signinLocal(authDto: AuthSignInDto) : Promise<Tokens>{
        const user = await this.userModel.findOne({email : authDto.email});

        if (!user) {
            throw new BadRequestException("User not found");
        }

        const passwordVerif = await bcrypt.compare(authDto.password, user.passwordHash);

        if (!passwordVerif){
            throw new ForbiddenException("Wrong password");
        }

        const tokens = await this.getTokens(user._id, user.email);

        await this.updateRtHash(user._id, tokens.refreshToken);

        return tokens;
        
    }

    async logout(userId : string) {
        
        const res = await this.userModel.updateOne({_id : userId}, {tokenHash: null});

        console.log("il est allé dans legout service", res, userId);

        if (!res.modifiedCount)
            throw new BadRequestException("Can't logout user ");
    }

    refreshTokens() {
        
    }

}
