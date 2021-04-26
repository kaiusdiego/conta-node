import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn} from "typeorm";
import Pessoa from "./pessoa";

@Entity('contas')
export default class Conta {

    @PrimaryGeneratedColumn("increment")
    idConta: number

    @Column({
        type: "bigint",
        unique: true
    })
    idPessoa: number

    @Column({
        type: "decimal",
        precision: 17,
        scale: 2
    })
    saldo: number

    @Column({
        type: "decimal",
        precision: 17,
        scale: 2
    })
    limiteSaqueDiario: number

    @Column("boolean")
    flagAtivo: boolean

    @Column("int")
    tipoConta: number
    
    @CreateDateColumn({ name: 'dataCriacao', type: 'timestamp with time zone' })
    dataCriacao: Date

    @OneToOne(() => Pessoa, pessoa => pessoa.idPessoa)
    @JoinColumn({name: 'idPessoa',referencedColumnName: 'idPessoa'})
    pessoa: Pessoa;

}
