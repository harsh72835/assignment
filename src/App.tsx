import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { PaginatedProducts, ProductModal } from "./common/model";
import {
  Folder,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { calculatePercentageValue } from "./lib/utils";
import useCartStore from "./common/store";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

export const App = () => {
  const [, setSearchVariable] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<PaginatedProducts>();
  const { cartProduct } = useCartStore();
  console.log(cartProduct);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });
  }, [searchTerm]);

  const NoProducts: React.FC = () => {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className=" flex flex-row items-center gap-2 mt-4 justify-center">
          <Folder />
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            No Products Found.
          </h4>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="flex flex-col gap-8 mt-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center align-middle justify-center gap-2 mt-10">
            <Input
              className="w-[400px] m-5"
              onChange={(e): void => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Search"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearchVariable(searchTerm);
                }
              }}
            />
            <Button
              disabled={!searchTerm}
              onClick={() => setSearchVariable(searchTerm)}
            >
              Search
            </Button>
          </div>
        </div>
        {products && products.products.length > 0 ? (
          <Products products={products} />
        ) : (
          <NoProducts />
        )}
      </div>
      {/* TODO: not working check at last  */}
      <Toaster theme="system" richColors closeButton />
      <Outlet />
    </>
  );
};

const Products: React.FC<{
  products: PaginatedProducts;
}> = ({ products }) => {
  const {
    addItemToCart,
    addToWishList,
    cartProduct,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const addToCartHandler = (each: ProductModal) => {
    addToWishList(each);
    toast.success("Product added to cart successfully.");
  };

  return (
    <div className="flex gap-4 flex-wrap m-5">
      {products.products?.map((each) => (
        <Card
          key={each.id}
          className="w-[273px] hover:shadow-2xl cursor-pointer"
        >
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
            <span className="font-semibold">
              ${calculatePercentageValue(each.price, each.discountPercentage)}{" "}
            </span>
            <span className="line-through text-gray-400">
              ${each.price.toLocaleString()}{" "}
            </span>
            <span></span>
            <span className="text-green-600 text-sm">
              {each.discountPercentage}% off
            </span>
          </CardContent>
          <CardFooter className="flex justify-between gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={"outline"}
                    onClick={() => addToCartHandler(each)}
                  >
                    <HeartIcon size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div>Add to Wishlist</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {cartProduct.some((cart) => cart.id === each.id) ? (
              <div className="flex items-center gap-3 border border-gray-400 p-0">
                <MinusIcon
                  size={16}
                  color="white"
                  className="bg-gray-600 rounded-sm"
                  onClick={() => decreaseQuantity(each)}
                />
                {cartProduct.find((cart) => cart.id === each.id)?.quantity}
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
                    <Button onClick={() => addItemToCart(each)}>
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
      ))}
    </div>
  );
};
