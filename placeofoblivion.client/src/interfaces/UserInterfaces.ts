/**
 * Represents a user.
 */
export interface User {
    /** Unique identifier of the user. */
    id: number;

    /** Username of the user. */
    username: string;

    /** Email address of the user. */
    email: string;
}

/**
 * Represents the response received after authentication.
 */
export interface AuthResponse {
    /** JWT token for authenticated requests. */
    token: string;

    /** Authenticated user details. */
    user: User;
}

/**
 * Represents the request body for authentication.
 */
export interface AuthRequest {
    /** Username of the user. */
    username: string;

    /** Email address of the user. */
    email: string;

    /** Hashed password of the user. */
    hashedPassword: string;

    /** User details associated with the request. */
    user: User;
}
