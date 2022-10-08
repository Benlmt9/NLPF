import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CreateApplicationDto, UpdateApplicationDto } from './dto/create-application.dto';
import jwt_decode from "jwt-decode";
import { isMongoId } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: Request, @Headers('Authorization') authHeader, @Body() createOfferDto: CreateOfferDto) { 
    const userId = req.user["sub"];
    
   /* if (authHeader){
      const accesToken = authHeader.replace('Bearer', '').trim();
      const jwtBody = jwt_decode(accesToken) as { sub: string}
      const userId = jwtBody.sub;*/

      if (!isMongoId(userId)){
        throw new BadRequestException("Provide an userId who own the offer (Bearer accestoken)");
      }

    return this.offersService.create({...createOfferDto, ownerId : userId});
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
  
  @Patch(':offerId')
  update(@Param('offerId') offerId: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(offerId, updateOfferDto);
  }
  

  // TODO ajouter auth guard
  @Post('/apply/:offerId/')
  apply(@Headers('Authorization') authHeader, @Param('offerId') offerId: string, @Body() createApplicationDto: CreateApplicationDto) {


    if (!authHeader){
     throw new BadRequestException("No token");
    }
      const accesToken = authHeader.replace('Bearer', '').trim();
      const jwtBody = jwt_decode(accesToken) as { sub: string}
      const userId = jwtBody.sub;

      if (!isMongoId(userId) && (!createApplicationDto.candidateId)){
        throw new BadRequestException("Provide an userId who own the offer (Bearer accestoken or request body");
      }


    const offerUpdate = this.offersService.apply(offerId, {...createApplicationDto, candidateId : userId});

    // TODO Application model en créer un aussi! 

    return offerUpdate ;//&& applicationCreated;
  }


  // TODO verif authguard si le userId c'est bien la company a qui appartient l'annonce
  @Patch('/apply/:offerId/')
  applyUpdate(@Param('offerId') offerId: string, @Body() updateApplicationDto: UpdateApplicationDto) { 
    //body contain : applicationId, state, reason? ;
    const offerUpdate = this.offersService.applyUpdate(offerId, updateApplicationDto);
    
    // TODO Application model le update aussi (son state et reason!) 

    return offerUpdate ;//&& applicationCreated;
  }


}
