import {Entity,  Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import Company from './Company';

@Entity('images')
export default class Images {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  path!: string;

  @ManyToOne(type => Company, images => Images)
  company!: Company;
}