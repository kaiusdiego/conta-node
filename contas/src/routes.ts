import ContasController from '@controllers/ContasController'
import { Router } from 'express'

const routes = Router()

routes.get('/', (req,res,next)=> {
    res.send('Contas OK')
    next()
})

routes.get('/contas',ContasController.index)
routes.post('/contas',ContasController.criar)
routes.put('/contas/:id/deposito',ContasController.depositar)
routes.get('/contas/:id/saldo',ContasController.obterSaldo)
routes.put('/contas/:id/saque',ContasController.sacar)
routes.patch('/contas/:id/bloqueio',ContasController.bloquear)
 
export default routes
