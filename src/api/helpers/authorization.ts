import { Action } from 'routing-controllers'
import { verify } from 'jsonwebtoken'

import { SECRET } from '~/config/env'

export const authorizationChecker = async (action: Action): Promise<boolean> => {
  const token = action.request.headers['authorization']
  verify(token, SECRET)
  return true
}
