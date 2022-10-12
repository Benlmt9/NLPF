import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { Offer } from 'src/schemas/offers.schema';
import { USER_TYPE } from 'src/users/entities/user.entity';
import { CreateApplicationDto, UpdateApplicationDto } from './dto/create-application.dto';
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

  
  async findAll(filter? : FindOffersFilter) {

    if (!filter){
      this.logger.log("Try getting all offers of the database...");
      return this.offerModel.find().exec();
    }

    let queryFilter;

    if (USER_TYPE[filter.type] == USER_TYPE['CANDIDATE'])
    {
      queryFilter = { state : 'OPEN' };
    }
    else if (USER_TYPE[filter.type] == USER_TYPE['COMPANY'])
    {
      if (!filter.id)
        throw new BadRequestException("Missing company id");

      queryFilter = { ownerId : filter.id};
    }
    

    const res = await this.offerModel.find(queryFilter).exec(); 

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

  async apply(id: string, createApplicationDto: CreateApplicationDto) {

    // TODO : application model à créer avant, pour en recup l'id.

    const applicationId = new Types.ObjectId();
    
    const offer = await this.findOne(id);

    //check if the user already applied to the offer
    if (offer && offer.applications){
      const res = Object.entries(offer.applications).forEach(
        ([key, value]) => {
          if (key === 'candidateId' && value) {
            if ((value as Array<String>).find(elt => elt === createApplicationDto.candidateId)) {
              throw new ForbiddenException("User already applied to this offer");
            }
          }
        }
      );
    }

    this.logger.log(`Try updating the offer with the id: ${id}...`);

    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException("Bad id");


    const updateParams = {
      $push: {
        applications: { ...createApplicationDto, applicationId }
      }
    };

    const offerUpdated = await this.offerModel.updateOne(
      { _id: id }, updateParams
    );

    if (!offerUpdated)
      throw new BadRequestException("Offer does not exist");

    return offerUpdated;
  }

  async applyUpdate(offerId: string, companyId: string, updateApplicationDto: UpdateApplicationDto) {
    //TODO : verif que l'annonce est pas CLOSED sinon pas possible d'applyUpddate

    this.logger.log(`Try updating state of an application related to the offer with the id: ${offerId}...`);
    if (!Types.ObjectId.isValid(offerId))
      throw new BadRequestException("Bad id");

    if (updateApplicationDto.state == "REJECTED") {
      const rejectedId = updateApplicationDto.applicationId;
      const updateParams = {
        $push: {
          rejectedApplications: rejectedId
        }
      };

      const offer = await this.offerModel.updateOne(
        { _id: offerId, ownerId: companyId }, updateParams
      );

      if (!offer) {
        throw new BadRequestException("Offer does not exist");
      }

      return offer;
    }

    else if (updateApplicationDto.state == "ACCEPTED") {
      if (!updateApplicationDto.choosenCandidate) {
        throw new BadRequestException("Should provide 'choosenCandidate' parameter to modify state to 'ACCEPTED' ");
      }

      const offer = await this.offerModel.updateOne(
        { _id: offerId, ownerId: companyId },
        {
          choosenCandidate: updateApplicationDto.choosenCandidate,
          state: "CLOSED"
        }
      );

      if (!offer)
        throw new BadRequestException("Offer does not exist");

      return offer;

    }

    throw new BadRequestException("Attribute 'state' need to be 'REJECTED' or 'ACCEPTED' and offer state not 'CLOSED'");
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
