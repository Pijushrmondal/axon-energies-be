import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ChargingStation } from './charging-station.entity';
import { FranchiseDetails } from './franchise-details.entity';
import { Role } from './role.entity';
import { Subscription } from './subscription.entity';
import { Tariff } from './tariff.entity';
import { Tax } from './tax.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  // ─── Scalar columns ──────────────────────────────────────────────────

  @Column({ name: 'user_name', type: 'varchar', unique: true })
  userName: string;

  @Column({ name: 'profile_picture', type: 'varchar', nullable: true })
  profilePicture?: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ name: 'user_status', type: 'varchar', default: 'active' })
  userStatus: string;

  @Column({
    name: 'mobile_number',
    type: 'bigint',
    nullable: true,
    unique: true,
  })
  mobileNumber?: number;

  @Column({ name: 'reset_token', type: 'varchar', nullable: true })
  resetToken?: string;

  @Column({ name: 'reset_token_expiration', type: 'timestamp', nullable: true })
  resetTokenExpiration?: Date;

  @Column({ name: 'reset_password_otp', type: 'varchar', nullable: true })
  resetPasswordOTP?: string;

  @Column({
    name: 'reset_password_otp_expiration',
    type: 'timestamp',
    nullable: true,
  })
  resetPasswordOtpExpiration?: Date;

  @Column({ name: 'is_first_time_login', type: 'boolean', default: false })
  isFirstTimeLogin: boolean;

  @Column({ type: 'varchar', nullable: true })
  poc?: string;

  @Column({ name: 'user_key', type: 'varchar', nullable: true })
  userKey?: string;

  @Column({
    name: 'temp_settlement_percentage',
    type: 'float',
    nullable: true,
    default: 2.5,
  })
  tempSettlementPercentage?: number;

  @Column({ name: 'updated_by', type: 'varchar', default: 'admin' })
  updatedBy: string;

  @Column({ name: 'email_updated_by', type: 'varchar', nullable: true })
  emailUpdatedBy?: string;

  @Column({ name: 'email_updated_at', type: 'timestamp', nullable: true })
  emailUpdatedAt?: Date;

  @Column({ name: 'user_name_updated_by', type: 'varchar', nullable: true })
  userNameUpdatedBy?: string;

  @Column({ name: 'user_name_updated_at', type: 'timestamp', nullable: true })
  userNameUpdatedAt?: Date;

  @Column({ name: 'mobile_number_updated_by', type: 'varchar', nullable: true })
  mobileNumberUpdatedBy?: string;

  @Column({
    name: 'mobile_number_updated_at',
    type: 'timestamp',
    nullable: true,
  })
  mobileNumberUpdatedAt?: Date;

  // ─── Foreign key ─────────────────────────────────────────────────────

  @Column({ name: 'role_id', type: 'uuid' })
  roleId: string;

  // ─── Relations ───────────────────────────────────────────────────────

  @ManyToOne(() => Role, (role) => role.users, { eager: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Subscription, (sub) => sub.user, { cascade: true })
  subscriptions: Subscription[];

  @OneToOne(() => FranchiseDetails, (fd) => fd.user, { cascade: true })
  franchiseDetails: FranchiseDetails;

  @OneToOne(() => Tax, (tax) => tax.user, { cascade: true })
  tax: Tax;

  @OneToOne(() => Tariff, (tariff) => tariff.user, { cascade: true })
  tariff: Tariff;

  @ManyToMany(() => ChargingStation, (cs) => cs.users)
  @JoinTable({
    name: 'user_station',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'charging_station_id',
      referencedColumnName: 'id',
    },
  })
  chargingStations: ChargingStation[];
}
