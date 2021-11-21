import { getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import { serverOptions } from '~/server'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

export const loadDocRoutes = (app: Express) => {
  const storage = getMetadataArgsStorage()
  /**
   * Classes to schemas.
   */
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/'
  })
  /**
   * Generates specs.
   */
  const spec = routingControllersToSpec(storage, serverOptions, {
    components: { schemas },
    info: { title: 'user-crud', version: '0.1' }
  })
  /**
   * Route.
   */
  app.use('/docs', serve, setup(spec))
}
