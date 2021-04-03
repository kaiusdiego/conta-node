export default class Transacoes {

    private idTransacao: number
    private idConta: number
    private valor: number
    private dataTransacao: Date

    constructor(idTransacao: number, idConta: number, valor: number,
        dataTransacao: Date) {
        this.idTransacao = idTransacao
        this.idConta = idConta
        this.valor = valor
        this.dataTransacao = dataTransacao
    }
}
