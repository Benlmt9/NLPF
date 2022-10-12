import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OffersSchema } from 'src/schemas/offers.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Offer.name, schema: OffersSchema }])],
  controllers: [OffersController],
  providers: [OffersService]
})
export class OffersModule {}
