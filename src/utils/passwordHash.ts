import * as bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10)
}

export const isMatch = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword)
}
