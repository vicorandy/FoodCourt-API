import { CreateAddonsDto } from './create-addons.dto';
import { PartialType } from 'nestjs-mapped-types';

export class UpdateAddonDto extends PartialType(CreateAddonsDto) {}
