export interface UserData {
    user: string
    email: string
    avatar?: string
    password: string
}

export type RegisterResponse = {
    id: number
    userId: number
    user: string
    avatar: string
    email: string
    createdAt: string
    updatedAt: string
}

export type UserLogin = {
    email: string
    password: string
}

export type UserLoginResponse = {
    message: string
    token: string
    user: RegisterResponse
}
