import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Favorites from './Favorites';
import Rating from './Rating';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(type => Favorites, user => User)
  favorites!: Favorites[];

  @OneToMany(type => Rating, user => User)
  ratings!: Rating[];
}