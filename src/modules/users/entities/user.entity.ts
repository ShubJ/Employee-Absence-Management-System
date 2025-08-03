import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../../../common/enums/role.enum';
import { AbsenceRequest } from '../../absences/entities/absence-request.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'text',
    enum: Role,
    default: Role.EMPLOYEE,
  })
  role: Role;

  @OneToMany(() => AbsenceRequest, (absenceRequest) => absenceRequest.employee)
  absenceRequests: AbsenceRequest[];
}
