import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Category {

  @PrimaryGeneratedColumn('uuid')
  id!: number
  @Column()
  name!: string; 
}