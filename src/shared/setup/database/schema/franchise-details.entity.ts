import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'franchise_details' })
export class FranchiseDetails extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @OneToOne(() => User, (user) => user.franchiseDetails)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
