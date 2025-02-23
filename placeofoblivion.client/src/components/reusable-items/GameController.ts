const API_URL = "https://localhost:7024/GameSession";

export const startGameSession = async () => {
    const response = await fetch(`${API_URL}/play`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to start game session");
    }

    return response.json();
};

export const getUserSessions = async () => {
    const response = await fetch(`${API_URL}/history`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch game history");
    }

    return response.json();
};
