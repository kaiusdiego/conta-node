import ContasController from '@controllers/ContasController'
import { Router } from 'express'

const routes = Router()

routes.get('/contas/:id',ContasController.saldo)
routes.post('/contas',ContasController.criar)

export default routes
