import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { Offer } from 'src/schemas/offers.schema';
import { USER_TYPE } from 'src/users/entities/user.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { FindOffersFilter } from './entities/offer.entity';


@Injectable()
export class OffersService {

  private readonly logger = new Logger(OffersService.name);

  constructor(@InjectModel(Offer.name) private offerModel: Model<Offer>) {}

  create(createOfferDto: CreateOfferDto) {
    this.logger.log("Try creating new offer in the database...");

    const createdOffer = new this.offerModel({...createOfferDto});
    return createdOffer.save();
  }


  
  findAll(filter? : FindOffersFilter) {

    if (!filter){
      this.logger.log("Try getting all offers of the database...");
      return this.offerModel.find().exec();
    }

    let queryFilter;

    if (USER_TYPE[filter.type] == USER_TYPE['CANDIDATE'])
    {
      //candidat => on return toutes les offers sauf les HIDDEN
      queryFilter = { state : 'HIDDEN' };
    }
    else if (USER_TYPE[filter.type] == USER_TYPE['COMPANY'])
    {
      //company => on return toutes les offers où le filter.id match.
      queryFilter = { ownerId : filter.id};
    }

    const res = this.offerModel.find(queryFilter).exec(); 

    return res;
  }

  async findOne(id: string) {
    this.logger.log(`Try getting the offer with the id: ${id}...`);

    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException("Bad id");

    const offer = await this.offerModel.findById(id);
    
    if (!offer)
      throw new BadRequestException("Offer does not exist"); 
    
    this.logger.log(`Offer found:`, offer);

    return offer;
  }


//TODO get offers (entreprise) : return que les offers de 

  async apply(id: string, createApplicationDto: CreateApplicationDto) {

    const applicationId = "TODO";
    const application = "TODO";


    this.logger.log(`Try updating the offer with the id: ${id}...`);

    if (!Types.ObjectId.isValid(id))
        throw new BadRequestException("Bad id");
       

    const updateParams = {
      $push: {
          applications: {...createApplicationDto, applicationId}
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

        const offer = await this.offerModel.updateOne({_id : id}, updateOfferDto);
      
        if (!offer)
          throw new BadRequestException("Offer does not exist"); 
        
      return offer;
  }
}
