import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { AbsencesRepository } from './absences.repository';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { GetAbsencesDto } from './dto/get-absences.dto';
import { AbsenceRequest } from './entities/absence-request.entity';
import { AbsenceStatus } from '../../common/enums/absence-status.enum';
import { Role } from '../../common/enums/role.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AbsencesService {
  constructor(private readonly absencesRepository: AbsencesRepository) {}

  async createAbsence(
    createAbsenceDto: CreateAbsenceDto,
    user: User,
  ): Promise<AbsenceRequest> {
    // if (user.role !== Role.EMPLOYEE) {
    //   throw new ForbiddenException(
    //     'Only employees can create absence requests',
    //   );
    // }

    // Validate dates
    const startDate = new Date(createAbsenceDto.startDate);
    const endDate = new Date(
      createAbsenceDto.endDate || createAbsenceDto.startDate,
    );
    if (startDate > endDate) {
      throw new BadRequestException('End date must be after start date');
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (startDate < today) {
      throw new BadRequestException('Start date cannot be in the past');
    }

    const toDateString = (d: Date) => d.toISOString().split('T')[0];

    // Check for overlapping absence requests
    const overlappingAbsences = await this.absencesRepository.find({
      employeeId: user.id,
      startDate: toDateString(startDate) as unknown as Date,
      endDate: toDateString(endDate) as unknown as Date,
    });
    if (overlappingAbsences.data?.length > 0) {
      throw new BadRequestException(
        'An absence request already exists for the same dates.',
      );
    }

    return this.absencesRepository.create({
      employeeId: user.id,
      startDate,
      endDate,
      reason: createAbsenceDto.reason,
      status: AbsenceStatus.PENDING,
    });
  }

  async getAllAbsences(getAbsencesDto: GetAbsencesDto): Promise<{
    data: AbsenceRequest[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { paginationOptions, status } = getAbsencesDto;
    const { page = 1, limit = 10 } = paginationOptions || {};
    const result = await this.absencesRepository.find(
      {},
      { page, limit },
      status,
    );

    return {
      ...result,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  }

  async approveAbsence(id: string, user: User): Promise<AbsenceRequest | null> {
    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('Only admins can approve absence requests');
    }

    const absence = await this.absencesRepository.findById(id);
    if (!absence) {
      throw new NotFoundException('Absence request not found');
    }

    if (absence.status !== AbsenceStatus.PENDING) {
      throw new BadRequestException('Only pending requests can be approved');
    }

    return this.absencesRepository.updateStatus(id, AbsenceStatus.APPROVED);
  }

  async rejectAbsence(id: string, user: User): Promise<AbsenceRequest | null> {
    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('Only admins can reject absence requests');
    }

    const absence = await this.absencesRepository.findById(id);
    if (!absence) {
      throw new NotFoundException('Absence request not found');
    }

    if (absence.status !== AbsenceStatus.PENDING) {
      throw new BadRequestException('Only pending requests can be rejected');
    }

    return this.absencesRepository.updateStatus(id, AbsenceStatus.REJECTED);
  }
}
