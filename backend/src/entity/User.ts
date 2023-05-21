import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Sex {
  Male = "Male",
  Female = "Female",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // @Column({ length: 100 })
  // name!: string;

  @Column({ length: 180, unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  admin!: boolean;

  @Column({ default: false })
  verified!: boolean;

  @Column({ length: 255 })
  first_name!: string;

  @Column({ length: 255 })
  last_name!: string;

  @Column({ type: "enum", enum: Sex })
  sex!: Sex;

  @Column({ length: 255 })
  address!: string;

  @Column({ length: 255 })
  valid_id_type!: string;

  @Column({ type: "date" })
  birthday!: Date;

  @Column()
  age!: number;
}
