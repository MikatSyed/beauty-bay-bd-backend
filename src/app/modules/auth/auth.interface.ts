export type ILoginResponse = {

  accessToken: string
  refreshToken?: string
}

export type ILoginUser = {
  email: string
  password: string
}

export type IRefreshTokenResponse = {
  accessToken: string
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
