import { AuthRequest, User } from "../../interfaces/UserInterfaces";

const API_URL = "https://localhost:7024/Users";

/**
 * Logs in a user by sending credentials to the server.
 * 
 * @param {string} email - The user's email.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<any>} - The authentication response.
 * @throws {Error} - If the email or password is incorrect.
 */
export async function loginUser(email: string, hashedPassword: string) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            username: "undefined",
            email,
            hashedPassword,
        }),
    });

    if (!response.ok) {
        throw new Error("Wrong email or password.");
    }

    return await response.json();
}

/**
 * Registers a new user.
 * 
 * @param {AuthRequest} data - The user registration data.
 * @returns {Promise<any>} - The registration response.
 * @throws {Error} - If the email is already used.
 */
export const register = async (data: AuthRequest) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Email already used.");
    }

    return response.json();
}

/**
 * Logs out the currently authenticated user.
 * 
 * @returns {Promise<void>} - Resolves when logout is complete.
 */
export const logoutUser = async () => {
    await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });
};

/**
 * Fetches the authenticated user's profile.
 * 
 * @returns {Promise<User>} - The user's profile data.
 * @throws {Error} - If the user is not authenticated.
 */
export const fetchUserProfile = async (): Promise<User> => {
    const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Not authenticated");
    }

    return response.json();
};
