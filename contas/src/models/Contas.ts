export default class Contas {

    private idConta: number
    private idPessoa: number
    private saldo: number
    private limiteSaqueDiario: number
    private flagAtivo: boolean
    private tipoConta: number
    private dataCriacao: Date

    constructor(idConta: number, idPessoa: number, saldo: number,
        limiteSaqueDiario: number, flagAtivo: boolean, tipoConta: number,
        dataCriacao: Date) {
        this.idConta = idConta
        this.idPessoa = idPessoa
        this.saldo = saldo
        this.limiteSaqueDiario = limiteSaqueDiario
        this.flagAtivo = flagAtivo
        this.tipoConta = tipoConta
        this.dataCriacao = dataCriacao
    }
}
