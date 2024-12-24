import * as jwt from 'jsonwebtoken'
import { IUser } from 'src/core/interfaces'

export const generateAccessToken = (User: Partial<IUser>) => {
  return jwt.sign(
    { _id: User?._id, email: User?.email },
    'wscfdsgvfdxbv_access',
    { expiresIn: '1m' },
  )
}

export const generateRefreshToken = (User: Partial<IUser>) => {
  return jwt.sign({ _id: User?._id }, 'wscfdsgvfdxbv_refresh', {
    expiresIn: '7d',
  })
}

export const verifyToken = async (token: string) => {
  return jwt.verify(token, 'wscfdsgvfdxbv_access')
}
