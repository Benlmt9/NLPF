import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { Offer } from 'src/schemas/offers.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {

  private readonly logger = new Logger(OffersService.name);

  constructor(@InjectModel(Offer.name) private offerModel: Model<Offer>) {}

  create(createOfferDto: CreateOfferDto) {
    this.logger.log("Try creating new offer in the database...");

    const createdOffer = new this.offerModel({...createOfferDto});
    return createdOffer.save();
  }

  findAll() {
    this.logger.log("Try getting all offers of the database...");
    return this.offerModel.find().exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} offer`;
  }

  /*
  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }
  */

  async apply(id: string, createApplicationDto: CreateApplicationDto) {


    this.logger.log(`Try updating the offer with the id: ${id}...`);

    if (!Types.ObjectId.isValid(id))
        throw new BadRequestException("Bad id");
       

    const updateParams = {
      $push: {
          applications: {...createApplicationDto}
      }
    };

    const offer = await this.offerModel.updateOne(
        {_id : id}, updateParams
      );

      if (!offer)
        throw new BadRequestException("Offer does not exist"); 


    return offer;
  }

  async update(id: string, updateOfferDto: UpdateOfferDto) {


    this.logger.log(`Try updating the offer with the id: ${id}...`);

    if (!Types.ObjectId.isValid(id))
        throw new BadRequestException("Bad id");


    const updateParams = {
      $push: {
          applications: { state: "REFUSED"}
      }
    };

    /*const offer = await this.offerModel.updateOne(
        {
          "_id" : id,
          "applications": { $elemMatch: { candidateId: "97524c1d1quizz45d5cf1ec2"} }
        } 
      
      , updateParams
      );*/

    const offer = this.offerModel.update(
      { _id: id, "applications.candidateId": "97524c1d1quizz45d5cf1ec2" },
      {
          $set: {
              "applications.$.state": "CIIBIEBE",
           }
      }
  )

  /*
  const itemId = 2;
const query = {
  item._id: itemId 
};
Person.findOne(query).then(doc => {
  item = doc.items.id(itemId );
  item["name"] = "new name";
  item["value"] = "new value";
  doc.save();
  */
      if (!offer)
        throw new BadRequestException("Offer does not exist"); 


    return offer;
  }
  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
