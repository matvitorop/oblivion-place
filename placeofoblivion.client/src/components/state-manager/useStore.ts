import { create } from "zustand";
import { User } from "../../interfaces/UserInterfaces";
import { logoutUser, fetchUserProfile } from "../reusable-items/AuthController";

interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    checkAuth: async () => {
        try {
            const user = await fetchUserProfile();
            set({ user });
        } catch {
            set({ user: null });
        }
    },
    logout: async () => {
        await logoutUser();
        set({ user: null });
    },
}));
