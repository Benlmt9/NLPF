import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://root:123123321@localhost:27017')], // + /nest ?
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
