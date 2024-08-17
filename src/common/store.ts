import { create } from "zustand";
import { ProductModal } from "./model";
import { toast } from "sonner";

type CartProduct = ProductModal & {
  quantity: number;
};

interface CartItems {
  cartProduct: CartProduct[];
  wishListProduct: ProductModal[];
  addItemToCart: (item: ProductModal) => void;
  addToWishList: (item: ProductModal) => void;
  increaseQuantity: (item: ProductModal) => void;
  decreaseQuantity: (item: ProductModal) => void;
}

const useCartStore = create<CartItems>((set, get) => ({
  cartProduct: [],
  wishListProduct: [],
  addItemToCart: (item) => {
    const existingItem = get().cartProduct.find((each) => each.id === item.id);
    if (existingItem) {
      if (typeof existingItem.quantity === "number") {
        existingItem.quantity++;
      }
      set({ cartProduct: [...get().cartProduct] });
    } else {
      set({ cartProduct: [...get().cartProduct, { ...item, quantity: 1 }] });
    }
  },
  addToWishList: (item) => {
    set({ wishListProduct: [...get().wishListProduct, { ...item }] });
  },
  increaseQuantity: (item) => {
    const existingItem = get().cartProduct.find((each) => each.id === item.id);
    if (existingItem) {
      if (typeof existingItem.quantity === "number") {
        existingItem.quantity++;
      }
      set({ cartProduct: [...get().cartProduct] });
    } else {
      toast.error("Please add the product in cart first");
    }
  },
  decreaseQuantity: (item) => {
    const existingItem = get().cartProduct.find((each) => each.id === item.id);
    if (existingItem?.quantity === 0) {
      set({ cartProduct: [] });
    } else if (existingItem) {
      if (typeof existingItem.quantity === "number") {
        existingItem.quantity--;
      }
      set({ cartProduct: [...get().cartProduct] });
    } else {
      toast.error("Please add the product in cart first");
    }
  },
}));

export default useCartStore;
