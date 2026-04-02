import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'tariff' })
export class Tariff extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string;

  @OneToOne(() => User, (user) => user.tariff)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
