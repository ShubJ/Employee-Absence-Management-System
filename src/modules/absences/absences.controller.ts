import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AbsencesService } from './absences.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { GetAbsencesDto } from './dto/get-absences.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';
import { User } from '../users/entities/user.entity';

@Controller('absences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AbsencesController {
  constructor(private readonly absencesService: AbsencesService) {}

  @Get()
  async getAllAbsences(@Query() getAbsencesDto: GetAbsencesDto) {
    return this.absencesService.getAllAbsences(getAbsencesDto);
  }

  @Post()
  @Roles(Role.EMPLOYEE)
  @HttpCode(HttpStatus.CREATED)
  async createAbsence(
    @Body() createAbsenceDto: CreateAbsenceDto,
    @CurrentUser() user: User,
  ) {
    return this.absencesService.createAbsence(createAbsenceDto, user);
  }

  @Patch(':id/approve')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async approveAbsence(@Param('id') id: string, @CurrentUser() user: User) {
    return this.absencesService.approveAbsence(id, user);
  }

  @Patch(':id/reject')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async rejectAbsence(@Param('id') id: string, @CurrentUser() user: User) {
    return this.absencesService.rejectAbsence(id, user);
  }
}
