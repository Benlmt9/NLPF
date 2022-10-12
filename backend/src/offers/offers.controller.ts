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
  create(@Req() req: Request, @Body() createOfferDto: CreateOfferDto) { 
    const userId = req.user["sub"];

      if (!isMongoId(userId)){
        throw new BadRequestException("Wrong acces token (does not contain an user id)");
      }

    return this.offersService.create({...createOfferDto, ownerId : userId});
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get('get/:offerId')
  findOne(@Param('offerId') offerId: string) {
    return this.offersService.findOne(offerId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/company/')
  findAllCompany(@Req() req: Request) {
    const companyId = req.user["sub"];
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

     

    return offerUpdate ;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/apply/:offerId/')
  applyUpdate(@Req() req: Request, @Param('offerId') offerId: string, @Body() updateApplicationDto: UpdateApplicationDto) { 
    const companyId = req.user["sub"];
    const offerUpdate = this.offersService.applyUpdate(offerId, companyId, updateApplicationDto);

    return offerUpdate ;
  }


}
