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
                },
                {
                    name: "saldo",
                    type: "decimal",
                },
                {
                    name: "limiteSaqueDiario",
                    type: "decimal",
                },
                {
                    name: "flagAtivo",
                    type: "decimal",
                },
                {
                    name: "tipoConta",
                    type: "decimal",
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
