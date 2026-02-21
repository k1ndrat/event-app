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
import { EEventType } from 'src/common/enums';

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
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsOptional()
  @IsEnum(EEventType)
  type: EEventType;

  @ValidateIf((o) => o.type === EEventType.OFFLINE)
  @IsString()
  @IsNotEmpty({ message: 'Location is required for offline events' })
  location: string;

  @ValidateIf((o) => o.type === EEventType.ONLINE)
  @IsString()
  @IsNotEmpty({ message: 'Link is required for online events' })
  @IsUrl({ require_protocol: true })
  link: string;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  maxAttendees: number;
}
