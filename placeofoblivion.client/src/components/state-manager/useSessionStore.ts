import { create } from "zustand";
import { getUserSessions, startGameSession } from "../../components/reusable-items/GameController";
import { GameSession } from "../../interfaces/GameInterfaces";
import { useBalanceStore } from "../state-manager/useBalanceStore"

/**
 * Interface that representing state and actions for managing user`s game session
 */
interface GameSessionState {
    /** Array of all past game sessions. */
    sessions: GameSession[];

    /** The currently active game session, or `null` if no session is active. */
    currentSession: GameSession | null;

    /** Fetches the user's game session history and updates the state. */
    fetchSessions: () => Promise<void>;

    /** Starts a new game session, updates the session state, and refreshes the user balance. */
    startSession: () => Promise<void>;
}

/**
 * Zustand store for managing game sessions, including fetching session history and starting new sessions.
 */
export const useGameSessionStore = create<GameSessionState>((set, get) => ({
    /** Array with all user`s session */
    sessions: [],

    /** Field for current session */
    currentSession: null,

    /** Fetch all user`s sessions */
    fetchSessions: async () => {
        const sessions = await getUserSessions();
        set({ sessions });
    },

    /** Creating new session and addin to session array */
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