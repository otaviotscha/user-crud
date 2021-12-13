import './config/aliases'
import './config/env'

import { server } from '~/server'
import { logger } from '~/common/logger'
import { PORT } from '~/config/env'

/**
 * Connecting to database and starting server.
 */
server().then(app => app.listen(PORT, () => logger.info(`Server running on port ${PORT}!`)))
