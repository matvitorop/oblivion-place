import { create } from "zustand";
import { getBalance, addBalance, withdrawBalance } from "../reusable-items/BalanceController";

/**
 * Interface representing the state and actions for managing the user's balance.
 */
interface BalanceState {
    /** Current balance of the user. */
    balance: number;

    /** Fetches the latest balance from the server and updates the state. */
    fetchBalance: () => Promise<void>;

    /** Increments the balance by a fixed amount and updates the state. */
    incrementBalance: () => Promise<void>;

    /**
     * Withdraws a specified amount from the balance.
     *
     * @param {number} amount - The amount to withdraw.
     * @returns {Promise<boolean>} A promise resolving to `true` if withdrawal was successful, otherwise `false`.
     */
    withdrawFunds: (amount: number) => Promise<boolean>;
}

/**
 * Zustand store for managing the user's balance, providing methods to fetch, add, and withdraw balance.
 */
export const useBalanceStore = create<BalanceState>((set) => ({
    balance: 0,

    fetchBalance: async () => {
        const balance = await getBalance();
        set({ balance });
    },

    incrementBalance: async () => {
        await addBalance();
        await useBalanceStore.getState().fetchBalance();
    },

    withdrawFunds: async (amount: number) => {
        const updatedBalance = await withdrawBalance(amount);
        if (updatedBalance) {
            await useBalanceStore.getState().fetchBalance();
            return true;
        }
        return false;
    },
}));