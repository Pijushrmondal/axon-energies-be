import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'subscription' })
export class Subscription extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
