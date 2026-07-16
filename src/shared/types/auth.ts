export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {

    accessToken: string;

    userId: number;

    email: string;

    role: string;
}