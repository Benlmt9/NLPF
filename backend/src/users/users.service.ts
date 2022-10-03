import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log("Try creating new user in the database...");
    this.logger.log(`Check if the email ${createUserDto.email} is already used or not...`);

    const alreadyExist = await this.userModel.findOne({ email : createUserDto.email }).exec();

    if (alreadyExist) {
      this.logger.log("User found with the same email address:", alreadyExist);
      throw new BadRequestException("Email already used"); 
    }

    this.logger.log(`Check DTO:`, createUserDto);

    // TODO : really hash the password and manage token with passport js 
    const createdUser = new this.userModel({...createUserDto, passwordHash : `${createUserDto.password}hashed`});

    return createdUser.save();
  }

  async findAll(): Promise<User[]>{
    this.logger.log("Try getting all users of the database...");
    return this.userModel.find().exec();
  }

  async findOneByMail(email: string) {
    this.logger.log(`Try getting the user with the email: ${email}...`);
    const user = await this.userModel.findOne({ email });
  
    if (!user)
    throw new BadRequestException("User does not exist"); 
  
    this.logger.log(`User found:`, user);

    return user;
  }

  async findOneById(id: string) {
    this.logger.log(`Try getting the user with the id: ${id}...`);

    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException("Bad id");

    const user = await this.userModel.findById(id);
    
    if (!user)
      throw new BadRequestException("User does not exist"); 
    
    this.logger.log(`User found:`, user);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
