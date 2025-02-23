import { create } from "zustand";
import { User } from "../../interfaces/UserInterfaces";
import { logoutUser, fetchUserProfile } from "../reusable-items/AuthController";

interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserState & { isLoading: boolean }>((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) => set({ user }),
    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const user = await fetchUserProfile();
            set({ user, isLoading: false });
        } catch {
            set({ user: null, isLoading: false });
        }
    },
    logout: async () => {
        await logoutUser();
        set({ user: null, isLoading: false });
    },
}));
