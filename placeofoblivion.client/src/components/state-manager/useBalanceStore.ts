import { create } from "zustand";
import { getBalance, addBalance, withdrawBalance } from "../reusable-items/BalanceController";


interface BalanceState {
    balance: number;
    fetchBalance: () => Promise<void>;
    incrementBalance: () => Promise<void>;
    withdrawFunds: (amount: number) => Promise<boolean>;
}

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