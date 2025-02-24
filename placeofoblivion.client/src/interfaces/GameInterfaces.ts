/**
 * Represents a game session.
 * 
 * @interface GameSession
 */
export interface GameSession {
    /** Unique identifier of the game session */
    id: number;

    /** User ID associated with the session */
    userId: number;

    /** Date and time when the session was played (ISO string format) */
    playedAt: string;

    /** Symbols obtained in the session */
    symbols: string;

    /** Indicates if the session resulted in a win */
    isWin: boolean;

    /** Prize amount won in the session */
    prize: number;
}

/**
 * Represents the user's balance.
 * 
 * @interface Balance
 */
export interface Balance {
    /** The total balance amount */
    amount: number;
}

/**
 * Represents a response message from the server.
 * 
 * @interface Message
 */
export interface Message {
    /** The message content */
    message: string;
}