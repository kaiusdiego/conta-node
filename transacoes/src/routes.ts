import TransacoesController from '@controllers/TransacoesController'
import { Router } from 'express'

const routes = Router()

routes.get('/transacoes',TransacoesController.index)

export default routes
