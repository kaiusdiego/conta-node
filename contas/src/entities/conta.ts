import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity()
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

}
