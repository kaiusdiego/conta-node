import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex} from "typeorm";

export class Conta1617580054954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "contas",
            columns: [
                {
                    name: "idConta",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "idPessoa",
                    type: "int",
                    isUnique: true
                },
                {
                    name: "saldo",
                    type: "decimal",
                    precision: 17,
                    scale: 2
                },
                {
                    name: "limiteSaqueDiario",
                    type: "decimal",
                    precision: 17,
                    scale: 2
                },
                {
                    name: "flagAtivo",
                    type: "decimal"
                },
                {
                    name: "tipoConta",
                    type: "decimal"
                },
                {
                    name: "dataCriacao",
                    type: 'timestamp',
                    default: 'now()'  
                }
            ]
        }), true)


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
