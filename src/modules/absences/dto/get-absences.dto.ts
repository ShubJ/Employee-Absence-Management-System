import { IsOptional, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AbsenceStatus } from '../../../common/enums/absence-status.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetAbsencesDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  paginationOptions?: PaginationDto;

  @IsOptional()
  @IsEnum(AbsenceStatus)
  status?: AbsenceStatus;
}
