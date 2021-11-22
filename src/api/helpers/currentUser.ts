import { Action, ForbiddenError } from 'routing-controllers'
import { decode } from 'jsonwebtoken'

import { UserInfo } from './@types/userInfo'

export const currentUserChecker = async (action: Action): Promise<UserInfo> => {
  const token = action.request.headers['authorization']
  if (!token) throw new ForbiddenError('Failed to get auth token')

  const decodedToken = decode(token, { json: true })
  if (!decodedToken) throw new ForbiddenError('Failed to get current user info')

  return { id: decodedToken.id, username: decodedToken.username }
}
