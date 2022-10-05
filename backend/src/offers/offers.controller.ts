import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, BadRequestException } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CreateApplicationDto, UpdateApplicationDto } from './dto/create-application.dto';
import jwt_decode from "jwt-decode";
import { isMongoId } from 'class-validator';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Headers('Authorization') authHeader, @Body() createOfferDto: CreateOfferDto) { 
    
    if (authHeader){
      const accesToken = authHeader.replace('Bearer', '').trim();
      const jwtBody = jwt_decode(accesToken) as { sub: string}
      const userId = jwtBody.sub;

      if (!isMongoId(userId) && (!createOfferDto.ownerId)){
        throw new BadRequestException("Provide an userId who own the offer (Bearer accestoken or request body");
      }

    return this.offersService.create({...createOfferDto, ownerId : userId});

    }

    return this.offersService.create(createOfferDto);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  @Get('/company/:companyId')
  findAllCompany(@Param('companyId') companyId: string) {
    return this.offersService.findAll({type: "COMPANY", id : companyId});
  }

  @Get('/candidate')
  findAllCandidate() {
    return this.offersService.findAll({type: "CANDIDATE"});
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(id, updateOfferDto);
  }
  

  @Post('/apply/:offerId/')
  apply(@Param('offerId') offerId: string, @Body() createApplicationDto: CreateApplicationDto) {
    const offerUpdate = this.offersService.apply(offerId, createApplicationDto);
    
    // TODO Application model en créer un aussi! 

    return offerUpdate ;//&& applicationCreated;
  }

  @Patch('/apply/:offerId/')
  applyUpdate(@Param('offerId') offerId: string, @Body() updateApplicationDto: UpdateApplicationDto) { 
    //body contain : applicationId, state, reason? ;
    const offerUpdate = this.offersService.applyUpdate(offerId, updateApplicationDto);
    
    // TODO Application model le update aussi (son state et reason!) 

    return offerUpdate ;//&& applicationCreated;
  }


}
