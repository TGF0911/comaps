import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Company from './Company';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  name!: string;

  @Column({length : 300})
  description!: string;

  @Column()
  price!: number;

  @Column()
  forSales!: boolean;

  @ManyToOne(type => Company, products => Product)
  company!: Company;
}