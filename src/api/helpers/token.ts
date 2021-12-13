import { decode, verify } from 'jsonwebtoken'
import { Action, UnauthorizedError } from 'routing-controllers'

import { handleThrownError } from '~/common/helpers'
import { logger } from '~/common/logger'
import { TOKEN_SECRET } from '~/config/env'

/**
 * Types.
 */
import { JWTToken } from './@types/token'

/**
 * Gets and decodes a token from header.
 */
export const getDecodedToken = async (action: Action): Promise<JWTToken> => {
  try {
    logger.info('=== /Token:getDecodedToken===')

    const token = await getToken(action)
    return decodeToken(token)
  } catch (error) {
    throw handleThrownError(error)
  } finally {
    logger.info('=== /Token:getDecodedToken===')
  }
}

/**
 * Gets token from authorization header and confirms it is a valid token.
 */
const getToken = async (action: Action): Promise<string> => {
  const token = `${action.request.headers['authorization']}`
  if (!token) throw new UnauthorizedError('Missing authorization header')
  verify(token, TOKEN_SECRET)
  return token
}

/**
 * Decodes a valid token confirming that iat, exp and sub claims are present.
 */
const decodeToken = async (token: string): Promise<JWTToken> => {
  const decodedToken = decode(token, { json: true })
  if (!decodedToken) throw new UnauthorizedError('Failed to decode token')

  /**
   * Mandatory claims.
   */
  if (!decodedToken.iat) throw new UnauthorizedError('IAT token claim is missing')
  if (!decodedToken.exp) throw new UnauthorizedError('EXP token claim is missing')
  if (!decodedToken.sub) throw new UnauthorizedError('SUB token claim is missing')

  return { iat: decodedToken.iat, sub: decodedToken.sub, exp: decodedToken.exp }
}
