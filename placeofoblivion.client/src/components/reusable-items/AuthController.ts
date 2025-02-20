import { AuthRequest, User } from "../../interfaces/UserInterfaces";

const API_URL = "https://localhost:7024/Users";

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

export const logoutUser = async () => {
    await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });
};

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
