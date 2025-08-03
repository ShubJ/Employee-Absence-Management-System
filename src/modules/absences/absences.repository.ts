import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { AbsenceRequest } from './entities/absence-request.entity';
import { AbsenceStatus } from '../../common/enums/absence-status.enum';

@Injectable()
export class AbsencesRepository {
  constructor(
    @InjectRepository(AbsenceRequest)
    private readonly absenceRepository: Repository<AbsenceRequest>,
  ) {}

  async create(absenceData: Partial<AbsenceRequest>): Promise<AbsenceRequest> {
    // Create and save the new absence request
    const absence = this.absenceRepository.create(absenceData);
    return this.absenceRepository.save(absence);
  }

  async findById(id: string): Promise<AbsenceRequest | null> {
    return this.absenceRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
  }

  async find(
    filter?: Partial<
      Pick<AbsenceRequest, 'employeeId' | 'startDate' | 'endDate' | 'status'>
    >,
    paginationOptions?: {
      page: number;
      limit: number;
    },
    status?: AbsenceStatus,
  ): Promise<{ data: AbsenceRequest[]; total: number }> {
    const { page, limit } = paginationOptions || { page: 1, limit: 10 };

    if (filter?.startDate instanceof Date) {
      filter.startDate = filter.startDate.toISOString().split('T')[0] as any;
    }
    if (filter?.endDate instanceof Date) {
      filter.endDate = filter.endDate.toISOString().split('T')[0] as any;
    }

    const options: FindManyOptions<AbsenceRequest> = {
      where: filter,
      relations: ['employee'],
      order: { createdAt: 'DESC' },
    };

    if (page) {
      options.skip = (page - 1) * limit;
      options.take = limit;
    }

    if (status) {
      options.where = { ...options.where, status };
    }

    const [data, total] = await this.absenceRepository.findAndCount(options);
    return { data, total };
  }

  async updateStatus(
    id: string,
    status: AbsenceStatus,
  ): Promise<AbsenceRequest | null> {
    await this.absenceRepository.update(id, { status });
    return this.findById(id);
  }
}
