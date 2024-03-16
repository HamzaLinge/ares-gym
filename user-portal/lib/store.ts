import { TSupplement } from "@/types/supplement";
import { create } from "zustand";

type TCartSupplement = TSupplement & { quantity: number };

type TCartState = {
  supplements: TCartSupplement[];
};

type TCartActions = {
  addSupplement: (supplement: TSupplement) => void;
  removeSupplement: (supplementId: string) => void;
  clearCart: () => void;
};

export const useCart = create<TCartState & TCartActions>()((set, get) => ({
  supplements: [],

  addSupplement: (supplement: TSupplement) =>
    set((state) => ({
      supplements: [...state.supplements, { ...supplement, quantity: 1 }],
    })),

  removeSupplement: (supplementId: string) =>
    set((state) => ({
      supplements: state.supplements.filter(
        (supplement) => supplement._id !== supplementId,
      ),
    })),

  clearCart: () => set({ supplements: [] }),
}));
