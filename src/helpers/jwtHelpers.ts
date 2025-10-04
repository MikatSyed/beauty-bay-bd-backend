import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: SignOptions['expiresIn']  // <- now “string | number | StringValue”
): string => {
  const options: SignOptions = { expiresIn: expireTime }
  return jwt.sign(payload, secret, options)
}

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

export const jwtHelpers = {
  createToken,
  verifyToken,
}
