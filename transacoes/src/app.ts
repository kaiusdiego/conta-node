import express from 'express'
import cors from 'cors'
import routes from './routes'
import schema from './docs/schema.json'
import swaggerUi from "swagger-ui-express"
import { OpenApiValidator } from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

class App{

  public express: express.Application

  public constructor (){
    this.express = express()

    this.middlewares()
    this.routes()
    this.docsSetup()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes (): void {
    this.express.use(routes)
  }

  private async docsSetup(): Promise<void> {
    this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(schema))
    await new OpenApiValidator({
      apiSpec: schema as OpenAPIV3.Document,
      validateRequests: true, //we do it
      validateResponses: true,
    }).install(this.express)
  }

}

export default new App().express
