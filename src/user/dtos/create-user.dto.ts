import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(120)
  age?: number;

  @IsOptional()
  isActive?: boolean;
}
