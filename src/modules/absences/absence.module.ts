import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceRequest } from './entities/absence-request.entity';
import { AbsencesService } from './absences.service';
import { AbsencesController } from './absences.controller';
import { AbsencesRepository } from './absences.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AbsenceRequest])],
  controllers: [AbsencesController],
  providers: [AbsencesService, AbsencesRepository],
})
export class AbsencesModule {}
