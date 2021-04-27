export default interface ITransacao {

    idTransacao: number
    idConta: number
    valor: number
    limite?: number
    dataTransacao: Date

}
