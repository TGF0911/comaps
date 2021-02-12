import {Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Company from './Company';
import User from './User';

@Entity()
export default class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ManyToOne(type => User, favorites => Favorites, {eager: true})
  user!: User;

  @ManyToOne(type => Company, favorites => Favorites)
  company!: Company;
}