import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateAbsenceDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsNotEmpty()
  @MinLength(10)
  reason: string;
}
