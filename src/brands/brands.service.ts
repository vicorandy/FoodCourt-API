import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateBrandDto } from './dto/create-brand.dto';
import { CreateAddonsDto } from '../addons/dto/create-addons.dto';
import { UpdateAddonDto } from '../addons/dto/update-addons.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async createBrand(data: CreateBrandDto, req: any): Promise<any> {
    const { id } = req.user;

    const { brandName } = data;
    data.userId = id;
    if (!brandName) {
      throw new HttpException('provide a brand name', HttpStatus.BAD_REQUEST);
    }
    const [{ brandId }] = await this.knex
      .table('brands')
      .insert({ brandName: data.brandName, userId: data.userId })
      .returning('id');
    return { ...data, id: brandId };
  }
  async createAddon(data: CreateAddonsDto, brandId): Promise<any> {
    const { name, price } = data;
    if (!name || !price) {
      throw new HttpException(
        'your request body is missing some fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    data.id = brandId;
    const [{ id }] = await this.knex
      .table('addons')
      .insert({
        name: data.name,
        price: data.price,
        description: data.description,
        category: data.category,
        brandId: data.id,
      })
      .returning('id');
    console.log(id);
    return { ...data, id, brandId };
  }
  async fetchAllmeals(id: number): Promise<any> {
    const data = await this.knex.table('addons').where('brandId', id);
    if (data.length < 1) {
      throw new HttpException(
        `No meals available for the brand with that id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return { data };
  }
  async fetchSingleMeal(brandId: number, addonId: number): Promise<any> {
    const data = await this.knex
      .table('addons')
      .where('brandId', brandId)
      .where('id', addonId);
    if (data.length < 1) {
      throw new HttpException(
        `No addon with that id: ${addonId} and brandId: ${brandId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return { data };
  }
  async updateMeal(
    brandId: number,
    addonId: number,
    data: UpdateAddonDto,
  ): Promise<any> {
    const meal = await this.knex
      .table('addons')
      .where('brandId', brandId)
      .where('id', addonId)
      .update({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
      });
    if (meal < 1) {
      throw new HttpException(
        `no meal with the id: ${addonId} and brandId: ${brandId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'opearation successful your meal has been updated',
    };
  }
  async deleteMeal(brandId, addonId): Promise<any> {
    const meal = await this.knex
      .table('addons')
      .where('brandId', brandId)
      .where('id', addonId)
      .del();

    if (meal < 1) {
      throw new HttpException(
        `no meal with the id: ${addonId} and brandId: ${brandId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'opearation successful your meal has been deleted',
    };
  }
}
