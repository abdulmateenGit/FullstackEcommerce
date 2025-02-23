import { create } from 'zustand';

export const useCart = create((set) => ({
  items: [],
  hasItems: false, // New state to track if items are added

  addProduct: (product) =>
    set((state) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingProductIndex].quantity += 1;
        return { items: updatedItems, hasItems: true }; // Set hasItems to true
      } else {
        return {
          items: [...state.items, { product, quantity: 1 }],
          hasItems: true, // Set hasItems to true
        };
      }
    }),

  increaseQuantity: (productId) =>
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.product.id === productId) {
          item.quantity += 1;
        }
        return item;
      });
      return { items: updatedItems, hasItems: true }; // Ensure hasItems stays true
    }),

  decreaseQuantity: (productId) =>
    set((state) => {
      const updatedItems = state.items
        .map((item) => {
          if (item.product.id === productId && item.quantity > 1) {
            item.quantity -= 1;
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with quantity 0
      return { items: updatedItems, hasItems: updatedItems.length > 0 }; // Update hasItems based on remaining items
    }),

    restCart: () => set({ items: [], hasItems: false }), // Reset the cart
}));