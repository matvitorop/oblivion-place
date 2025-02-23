export interface GameSession {
    id: number;
    userId: number;
    playedAt: string;
    symbols: string;
    isWin: boolean;
    prize: number;
}

export interface Balance {
    amount: number;
}

export interface Message {
    message: string;
}