import { create } from "zustand";
import { getUserSessions, startGameSession } from "../../components/reusable-items/GameController";
import { GameSession } from "../../interfaces/GameInterfaces";
import { useBalanceStore } from "../state-manager/useBalanceStore"
interface GameSessionState {
    sessions: GameSession[];
    currentSession: GameSession | null;
    fetchSessions: () => Promise<void>;
    startSession: () => Promise<void>;
}

export const useGameSessionStore = create<GameSessionState>((set, get) => ({
    sessions: [],
    currentSession: null,

    fetchSessions: async () => {
        const sessions = await getUserSessions();
        set({ sessions });
    },

    startSession: async () => {
        const newSession = await startGameSession();

        if (newSession) {
            set((state) => ({
                currentSession: newSession,
                sessions: [newSession, ...state.sessions],
            }));

            await useBalanceStore.getState().fetchBalance();
        }
    },
}));