import { Message } from "react-hook-form";


const API_URL = "https://localhost:7024/Balances";

export const getBalance = async (): Promise<number> => {
    const response = await fetch(`${API_URL}/balance`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch balance");
    }

    const data = await response.json();
    return data.balance; // ¬ит€гуЇмо число з об'Їкта
};

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
