import {
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  IsString,
  IsBoolean,
  IsMongoId,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { EEventFilterStatus, EEventSortBy, EEventType } from 'src/common/enums';
import { Types } from 'mongoose';

export class GetEventsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsEnum(EEventSortBy)
  sortBy?: EEventSortBy;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  desc?: boolean;

  @IsOptional()
  @IsEnum(EEventFilterStatus)
  status?: EEventFilterStatus;

  @IsOptional()
  @IsEnum(EEventType)
  type?: EEventType;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsMongoId()
  organizerId?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  attendeeId?: Types.ObjectId;
}
