import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Favorites from './Favorites';
import Product from './Product';
import Rating from './Rating';

@Entity()
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  cnpj!: string;


  @Column()
  description!: string;


  @Column()
  latitude!: number;

  @Column()
  longitude!: number;

  @Column()
  isPremium!: boolean;

  @OneToMany(type => Favorites, company => Company)
  favorites!: Favorites[];

  @OneToMany(type => Rating, company => Company)
  ratings!: Rating[];

  @OneToMany(type => Product, company => Company)
  products!: Product[];
}