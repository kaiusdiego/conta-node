import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Transacao1617862328800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "transacoes",
            columns: [
                {
                    name: "idTransacao",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "idConta",
                    type: "int"
                },
                {
                    name: "valor",
                    type: "decimal",
                    precision: 17,
                    scale: 2
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
