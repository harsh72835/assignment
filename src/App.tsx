import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { PaginatedProducts } from "./common/model";
import { Folder } from "lucide-react";

import { Toaster } from "./components/ui/sonner";
import ProductInfo from "./components/ProductInfo";

export const App = () => {
  const [, setSearchVariable] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<PaginatedProducts>();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });
  }, [searchTerm]);

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
      <Toaster theme="system" richColors closeButton />
      <Outlet />
    </>
  );
};

export const NoProducts: React.FC = () => {
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

const Products: React.FC<{
  products: PaginatedProducts;
}> = ({ products }) => {
  return (
    <div className="flex gap-4 flex-wrap m-5">
      {products.products?.map((each) => (
        <ProductInfo each={each} />
      ))}
    </div>
  );
};
