import { create } from "zustand";
import { ProductModal } from "./model";
import { toast } from "sonner";
import { calculatePercentageValue } from "@/lib/utils";

export type CartProduct = ProductModal & {
  quantity: number;
  discountedPrice: number;
};

interface CartItems {
  isCartPageOpen: boolean;
  setIsCartPageOpen: (value: boolean) => void;
  cartProduct: CartProduct[];
  wishListProduct: ProductModal[];
  addItemToCart: (item: ProductModal) => void;
  addToWishList: (item: ProductModal) => void;
  increaseQuantity: (item: ProductModal) => void;
  decreaseQuantity: (item: ProductModal) => void;
  deleteFromStore: (item: ProductModal) => void;
}

const useCartStore = create<CartItems>((set, get) => ({
  isCartPageOpen: false,
  setIsCartPageOpen: (value) => {
    set({ isCartPageOpen: value });
  },
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
      set({
        cartProduct: [
          ...get().cartProduct,
          {
            ...item,
            quantity: 1,
            discountedPrice: +calculatePercentageValue(
              item.price,
              item.discountPercentage
            ),
          },
        ],
      });
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
      const filteredProducts = get().cartProduct.filter(
        (each) => each.id !== item.id
      );
      set({ cartProduct: [...filteredProducts] });
    } else if (existingItem) {
      if (typeof existingItem.quantity === "number") {
        existingItem.quantity--;
      }
      set({ cartProduct: [...get().cartProduct] });
    } else {
      toast.error("Please add the product in cart first");
    }
  },
  deleteFromStore: (item) => {
    const filteredProducts = get().cartProduct.filter(
      (each) => each.id !== item.id
    );
    set({ isCartPageOpen: false, cartProduct: [...filteredProducts] });
  },
}));

export default useCartStore;
