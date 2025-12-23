import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { EventType } from 'src/common/enums';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  description: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsOptional()
  @IsEnum(EventType)
  type: EventType;

  @ValidateIf((o) => o.type === EventType.OFFLINE)
  @IsString()
  @IsNotEmpty({ message: 'Location is required for offline events' })
  location: string;

  @ValidateIf((o) => o.type === EventType.ONLINE)
  @IsString()
  @IsNotEmpty({ message: 'Link is required for online events' })
  @IsUrl()
  link: string;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  maxAttendees: number;
}
