const API_URL = "https://localhost:7024/GameSession";

/**
 * Starts a new game session by sending a request to the backend.
 *
 * @async
 * @function
 * @throws {Error} If the request fails.
 * @returns {Promise<any>} A promise resolving to the session data.
 */
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

/**
 * Retrieves the game session history for the authenticated user.
 *
 * @async
 * @function
 * @throws {Error} If the request fails.
 * @returns {Promise<any>} A promise resolving to the user's game history.
 */
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
