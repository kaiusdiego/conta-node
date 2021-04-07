import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity()
export default class Transacao {

    @PrimaryGeneratedColumn("increment")
    idTransacao: number

    @Column({
        type: "bigint"
    })
    idConta: number

    @Column({
        type: "decimal",
        precision: 17,
        scale: 2
    })
    valor: number

    @CreateDateColumn({ name: 'dataTransacao', type: 'timestamp with time zone' })
    dataTransacao: Date

}
