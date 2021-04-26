# AppContas
## @kaiusdiego

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

AppContas é uma pequena app que envolve dois microsserviços (Contas e Transações) que realizam operações bancárias utilizando as entidades Conta, Pessoa e Transação.

## Recursos

- Criação de uma conta
- Depósito em uma conta
- Consulta de saldo em determinada conta
- Saque em uma conta
- Bloqueio de uma conta
- Consulta de extrato de transações por conta
- Consulta de extrato de transações por conta e período

## Tecnologias

AppContas uses a number of open source projects to work properly:

- [Node.js] - framework JavaScript de código aberto, plataforma cruzada e back-end que é executado no mecanismo V8 e executa o código JavaScript fora de um navegador da web.
- [Express] - framework pequeno e flexível que fornece um conjunto robusto de recursos para aplicativos da web e móveis.
- [TypeORM] - TypeORM é um ORM que pode ser executado nas plataformas NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo e Electron e pode ser usado com TypeScript e JavaScript (ES5, ES6, ES7, ES8). 
- [PostgreSQL] - sistema de gerenciamento de banco de dados relacional de código aberto gratuito que enfatiza a extensibilidade e a conformidade com SQL.
- [RabbitMQ] - um dos message brokers open source mais utilizados.
- [Swagger] - uma linguagem de descrição de interface para descrever APIs RESTful expressas usando JSON. O Swagger é usado junto com um conjunto de ferramentas de software de código aberto para projetar, construir, documentar e usar serviços da Web RESTful.
- [Jest] - Um framweork de teste de JavaScript agradável com foco na simplicidade.


## Rodando o projeto

* PS: Para efeito de teste, foi criado um arquivo de environment de exemplo, portanto, antes de iniciar a aplicação, é necessário alterar o nome e extensão do arquivo *"__env_exemplo__"* para "__.env__"

Feito isso, o AppContas é facilmente iniciado, basta executar o comando:

```sh
docker-compose up 
```

Por padrão, todos os containers serão levantados em conjunto e as portas inicialmente definidas são as definidas no "__.env__".

Sendo assim:
#### contasapp:

```sh
http://localhost:3000
```
#### transacoesapp:

```sh
http://localhost:3001
```


### Rodando testes com Jest

Após ter todos os containers rodando, é possível executar os testes através do da linha de comando com os seguintes comandos:


##### Testes de "transacoesapp":

```sh
docker container exec -it transacoesapp yarn test
```
##### Testes de "contasapp":

```sh
docker container exec -it contasapp yarn test
```


## Documentação

Para acessar a documentação criada via [Swagger](https://swagger.io/) é necessário iniciar a aplicação pela seção anterior e acessar os endereços: 
```sh
http://localhost:3000/docs (contasapp)
http://localhost:3001/docs (transacoesapp)
```

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [TypeORM]: <https://typeorm.io/#/>
   [PostgreSQL]: <https://www.postgresql.org/>
   [RabbitMQ]: <https://www.rabbitmq.com/>
   [Swagger]: <https://swagger.io/>
   [Jest]: <https://jestjs.io/>
