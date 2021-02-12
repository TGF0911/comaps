import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Company from './Company';
import User from './User';

@Entity()
export default class Rating {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  stars!: number;

  @ManyToOne(type => User, rating => Rating, {eager: true})
  user!: User;

  @ManyToOne(type => Company, rating => Rating)
  company!: Company;

}