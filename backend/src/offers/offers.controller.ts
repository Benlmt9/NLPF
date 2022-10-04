import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  @Get('/company/:companyId')
  findAllCompany(@Param('companyId') companyId: string) {
    return this.offersService.findAll({type: "COMPANY", id : companyId});
  }

  @Get('/candidate/:candidateId')
  findAllCandidate(@Param('candidateId') candidateId: string) {
    return this.offersService.findAll({type: "CANDIDATE", id : candidateId});
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(id, updateOfferDto);
  }
  

  @Post('/apply/:id/')
  apply(@Param('id') id: string, @Body() createApplicationDto: CreateApplicationDto) {
    const offerUpdate = this.offersService.apply(id, createApplicationDto);

    return offerUpdate ;//&& applicationCreated;
  }

}
