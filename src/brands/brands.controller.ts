import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Request } from 'express';
import { CreateAddonsDto } from 'src/addons/dto/create-addons.dto';
import { UpdateAddonDto } from '../addons/dto/update-addons.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandServices: BrandsService) {}
  @Post()
  createBrand(@Body() data: CreateBrandDto, @Req() req: Request) {
    return this.brandServices.createBrand(data, req);
  }
  @Post(':brandId/addons')
  createAddon(@Body() data: CreateAddonsDto, @Param('brandId') id) {
    return this.brandServices.createAddon(data, id);
  }
  @Get(':id/addons')
  getAllAddons(@Param('id') id) {
    return this.brandServices.fetchAllmeals(id);
  }
  @Get(':brandId/addons/:addonId')
  getSingleAddon(@Param() params) {
    const { brandId, addonId } = params;
    return this.brandServices.fetchSingleMeal(brandId, addonId);
  }
  @Patch(':brandId/addons/:addonId')
  updateAddon(@Body() data: UpdateAddonDto, @Param() params) {
    const { brandId, addonId } = params;
    return this.brandServices.updateMeal(brandId, addonId, data);
  }
  @Delete(':brandId/addons/:addonId')
  deleteAddon(@Param() params) {
    const { brandId, addonId } = params;
    return this.brandServices.deleteMeal(brandId, addonId);
  }
}
