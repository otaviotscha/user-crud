import { getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

import { serverOptions } from '~/server'

/**
 * Creates and loads "/docs" route.
 */
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
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    info: { title: 'user-crud', version: '0.1' }
  })

  /**
   * Docs route.
   */
  app.use('/docs', serve, setup(spec))
}
