export interface User {
    id: number;
    username: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthRequest {
    username: string;
    email: string;
    hashedPassword: string;
    user: User;
}
