import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne} from "typeorm";
import Conta from "./conta";

@Entity('pessoas')
export default class Pessoa {

    @PrimaryGeneratedColumn("increment")
    idPessoa: number

    @Column("varchar", { nullable: true, length: 150 })
    nome: string
    
    @Column("varchar", { nullable: true, length: 14 })
    cpf: string
    
    @Column({nullable: true, type: Date, })
    dataNascimento: Date

    @OneToOne(() => Conta, conta => conta) 
    conta: Conta;

}
