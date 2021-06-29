import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string
}