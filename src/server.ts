import path from 'path'
import { Server } from 'http'
import { createExpressServer } from 'routing-controllers'

/**
 * Loading controllers.
 */
const controllersPath = path.resolve(__dirname, 'api', 'routes', '**', 'controller.ts')

/**
 * Loading middlewares.
 */
const middlewaresPath = path.resolve(__dirname, 'api', 'middlewares', '**', '*.ts')

/**
 * Creating server.
 */
const app: Server = createExpressServer({
  cors: '*',
  defaultErrorHandler: false,
  controllers: [controllersPath],
  middlewares: [middlewaresPath]
})

export const server = async () => {
  return app
}
