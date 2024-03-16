import { TSupplement } from "@/types/supplement";
import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TCartSupplement = TSupplement & { quantity: number };

type TCartState = {
  supplements: TCartSupplement[];
};

type TCartActions = {
  addSupplement: (supplement: TSupplement) => void;
  removeSupplement: (supplementId: string) => void;
  increaseQuantity: (supplementId: string) => void;
  decreaseQuantity: (supplementId: string) => void;
  clearCart: () => void;
};

export type TCartStore = TCartState & TCartActions;

const defaultInitCartState: TCartState = {
  supplements: [],
};

export const createCartStore = (
  initState: TCartState = defaultInitCartState,
) => {
  return createStore<TCartStore>()(
    persist(
      (set) => ({
        ...initState,
        addSupplement: (supplement: TSupplement) =>
          set((state) => {
            const indexSupplement = state.supplements.findIndex(
              (food) => food._id === supplement._id,
            );
            if (indexSupplement !== -1) {
              return { supplements: state.supplements };
            }
            return {
              supplements: [
                ...state.supplements,
                { ...supplement, quantity: 1 },
              ],
            };
          }),

        removeSupplement: (supplementId: string) =>
          set((state) => ({
            supplements: state.supplements.filter(
              (supplement) => supplement._id !== supplementId,
            ),
          })),

        increaseQuantity: (supplementId: string) =>
          set((state) => ({
            supplements: state.supplements.map((supplement) =>
              supplement._id !== supplementId
                ? supplement
                : { ...supplement, quantity: supplement.quantity + 1 },
            ),
          })),

        decreaseQuantity: (supplementId: string) =>
          set((state) => ({
            supplements: state.supplements
              .filter(
                (supplement) =>
                  !(
                    supplement._id === supplementId && supplement.quantity === 1
                  ),
              )
              .map((supplement) => {
                if (
                  supplement._id === supplementId &&
                  supplement.quantity > 1
                ) {
                  return { ...supplement, quantity: supplement.quantity - 1 };
                }
                return supplement;
              }),
          })),

        clearCart: () => set({ supplements: [] }),
      }),
      {
        name: "shopping-cart-storage",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};
