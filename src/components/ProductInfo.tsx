import React from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { calculatePercentageValue } from "../lib/utils";
import { ProductModal } from "@/common/model";
import useCartStore, { CartProduct } from "@/common/store";
import { toast } from "sonner";
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCart,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const ProductInfo: React.FC<{ each: ProductModal | CartProduct }> = ({
  each,
}) => {
  const navigate = useNavigate();
  const {
    isCartPageOpen,
    wishListProduct,
    addItemToCart,
    addToWishList,
    cartProduct,
    increaseQuantity,
    decreaseQuantity,
    deleteFromStore,
  } = useCartStore();
  console.log(cartProduct);

  const addToWishlistHandler = (each: ProductModal) => {
    addToWishList(each);
    toast.success("Product added to wishlist successfully.");
  };

  const deleteHandler = (each: ProductModal) => {
    deleteFromStore(each);
    toast.success("Product removed from cart successfully.");
    navigate("../");
  };
  return (
    <>
      <Card key={each.id} className="w-[273px] hover:shadow-2xl cursor-pointer">
        <CardHeader>
          <img
            src={each.images[0]}
            height={200}
            width={200}
            className="object-scale-down h-[100px] w-[100px] m-auto"
          />
          <CardTitle>
            <h2 className="text-xl font-semibold">{each.brand}</h2>
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CardDescription className="truncate">
                  {each.description}
                </CardDescription>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-wrap w-[300px]">{each.description}</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <span className="font-semibold pr-2">
            ${calculatePercentageValue(each.price, each.discountPercentage)}{" "}
          </span>
          <span className="line-through text-gray-400 pr-2">
            ${each.price.toLocaleString()}{" "}
          </span>
          <span></span>
          <span className="text-green-600 text-sm">
            {each.discountPercentage}% off
          </span>
        </CardContent>
        <CardFooter className="flex justify-between gap-3">
          {isCartPageOpen ? (
            <Button variant={"outline"} onClick={() => deleteHandler(each)}>
              <Trash size={18} />
            </Button>
          ) : wishListProduct.some((wishList) => wishList.id === each.id) ? (
            <Button
              variant={"outline"}
              onClick={() => addToWishlistHandler(each)}
            >
              <HeartIcon fill="red" size={18} />
            </Button>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={"outline"}
                    onClick={() => addToWishlistHandler(each)}
                  >
                    <HeartIcon size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div>Add to Wishlist</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {cartProduct.some((cart) => cart.id === each.id) ? (
            <div className="flex items-center gap-3 p-0">
              <MinusIcon
                size={16}
                color="white"
                className="bg-gray-600 rounded-sm"
                onClick={() => decreaseQuantity(each)}
              />
              <span className="shadow-gray-400 shadow-inner rounded-sm px-2">
                {cartProduct.find((cart) => cart.id === each.id)?.quantity}
              </span>
              <PlusIcon
                size={16}
                color="white"
                className="bg-gray-600 rounded-sm"
                onClick={() => increaseQuantity(each)}
              />
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={() => {
                      addItemToCart(each);
                      toast.success("Product added cart successfully.");
                    }}
                  >
                    <ShoppingCart size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div>Add to Cart</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductInfo;
