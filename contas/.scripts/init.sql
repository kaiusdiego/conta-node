\c postgres;

drop table if exists "pessoas";

create table "pessoas" (
    idPessoa serial not null,
    nome varchar default '' not null,
    cpf varchar default '',
    dataNascimento date
);

INSERT INTO "pessoas"(nome, cpf, dataNascimento) VALUES ('Usuario1','000.000.000-00','2001-01-01');