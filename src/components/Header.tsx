import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useCartStore from "@/common/store";

const Header = () => {
  const { cartProduct } = useCartStore();
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between py-3 px-5 shadow-sm border border-b-1 rounded-sm items-center backdrop-blur-3xl bg-white/80 dark:bg-neutral-950">
      {/* <Image src="" alt="logo" /> */}
      <Link to={"/"}>
        <span className="font-bold">E-commerce</span>
      </Link>
      <div className="flex align-middle justify-center gap-4">
        <Link to={"your-wishlist"}>
          <Button className="flex align-middle gap-2" variant={"outline"}>
            <Heart />
          </Button>
        </Link>
        <Link to={"your-cart"}>
          <Button className="flex align-middle gap-2">
            <ShoppingCart />
            Your Cart <span>({cartProduct.length})</span>
          </Button>
        </Link>
        {/* <DropdownMenu>
          <div className="flex flex-row gap-2 items-center">
            <DropdownMenuTrigger>
              <User2 />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
};

export default Header;
