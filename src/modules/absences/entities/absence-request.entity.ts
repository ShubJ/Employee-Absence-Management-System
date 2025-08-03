import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { AbsenceStatus } from '../../../common/enums/absence-status.enum';
import { User } from '../../users/entities/user.entity';

@Entity('absence_requests')
export class AbsenceRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @ManyToOne(() => User, (user) => user.absenceRequests)
  @JoinColumn({ name: 'employeeId' })
  employee: User;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  reason: string;

  @Column({
    type: 'text',
    enum: AbsenceStatus,
    default: AbsenceStatus.PENDING,
  })
  status: AbsenceStatus;

  @CreateDateColumn()
  createdAt: Date;
}
