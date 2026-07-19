export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginData {
    accessToken: string;
    tokenType: string | null;
    userId: number;
    email: string;
    role: string;
}