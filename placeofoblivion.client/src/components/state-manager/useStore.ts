import { create } from "zustand";
import { User } from "../../interfaces/UserInterfaces";
import { logoutUser, fetchUserProfile, deleteUserAccount, updateUserData } from "../reusable-items/AuthController";

/**
 * Interface representing the state and actions for managing user authentication.
 */
interface UserState {
    /** The authenticated user, or `null` if no user is logged in. */
    user: User | null;

    /** Sets the current user state. */
    setUser: (user: User | null) => void;

    /** Checks if the user is authenticated and updates the state accordingly. */
    checkAuth: () => Promise<void>;

    /** Logs out the user and clears authentication state. */
    logout: () => Promise<void>;

    //** Update current user`s data*/
    updateUser: (updatedData: Partial<User>) => Promise<void>;

    //** Deleting user form database*/
    deleteUser: () => Promise<void>;

}

/**
 * Zustand store for managing user authentication and session state.
 */
export const useUserStore = create<UserState & { isLoading: boolean }>((set) => ({
    /** The currently authenticated user, initially `null`. */
    user: null,

    /** Indicates whether authentication status is being checked. */
    isLoading: true,

    /** Sets the user state. */
    setUser: (user) => set({ user }),

    /** Checks if a user is authenticated by fetching the user profile. */
    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const user = await fetchUserProfile();
            set({ user, isLoading: false });
        } catch {
            set({ user: null, isLoading: false });
        }
    },

    /** Logs out the user and clears their authentication state. */
    logout: async () => {
        await logoutUser();
        set({ user: null, isLoading: false });
    },

    updateUser: async (updatedData) => {
        try {
            const updatedUser = await updateUserData(updatedData);
            set({ user: updatedUser });
        } catch (error) {
            console.error("Failed to update user", error);
        }
    },
    deleteUser: async () => {
        try {
            await deleteUserAccount();
            set({ user: null });
            window.location.href = "/";
        } catch (error) {
            console.error("Failed to delete account", error);
        }
    },
}));
