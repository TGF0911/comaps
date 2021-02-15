import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Company from './Company';

@Entity()
export default class Category {

  @PrimaryGeneratedColumn('uuid')
  id!: number
  
  @Column()
  name!: string; 
  
  @ManyToOne(type => Company, categories => Category)
  company!: Company;
}