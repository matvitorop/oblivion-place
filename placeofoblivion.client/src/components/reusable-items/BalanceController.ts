import { Message } from "react-hook-form";


const API_URL = "https://localhost:7024/Balances";

/**
 * Get balance of current user
 * 
 * @returns {Promise<number>} - The current balance
 * @throws {Error} - If the request fails
 */
export const getBalance = async (): Promise<number> => {
    const response = await fetch(`${API_URL}/balance`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch balance");
    }

    const data = await response.json();
    return data.balance;
};

/**
 * Adds 100 units to the user`s balance
 * 
 * @returns {Promise<number>} - The updated balance
 * @throws {Error} - If the request fails
 */
export const addBalance = async (): Promise<number> => {
    const response = await fetch(`${API_URL}/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ Amount: 100 }),
    });

    if (!response.ok) {
        throw new Error("Failed to add balance");
    }

    return response.json();
};

/**
 * Adds 100 units to the user`s balance
 * 
 * @param {number} amount - The amount of withdraw
 * @returns {Promise<number>} - The updated balance
 * @throws {Error} - If the request fails
 */
export const withdrawBalance = async (amount: number): Promise<Message> => {
    const response = await fetch(`${API_URL}/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ Amount: amount }),
    });

    if (!response.ok) {
        throw new Error("Failed to withdraw balance");
    }

    return response.json();
};
