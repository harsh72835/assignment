import { NoProducts } from "@/App";
import useCartStore from "@/common/store";
import Header from "@/components/Header";
import ProductInfo from "@/components/ProductInfo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Lottie from "lottie-react";
import successAnimation from "../../assets/Animation - 1723921644166.json";
import { DialogClose } from "@radix-ui/react-dialog";

const YourCart = () => {
  const { cartProduct } = useCartStore();
  return (
    <>
      <Header />
      <div className="flex gap-8 mt-16 align-middle">
        <div className="flex gap-6 m-5 justify-between">
          <h1 className="font-semibold text-2xl">Your Cart</h1>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <Card className="max-w-[646px] p-2">
          <CardHeader>
            <CardTitle>Product details</CardTitle>
          </CardHeader>
          <div className="flex gap-10 flex-wrap self-center m-5">
            {cartProduct.length > 0 ? (
              cartProduct.map((each) => <ProductInfo each={each} />)
            ) : (
              <NoProducts />
            )}
          </div>
        </Card>
        <Card className="max-w-[350px]">
          <CardHeader>
            <CardTitle>Price Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-[300px]">
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold text-lg">
                    Price (
                    {cartProduct.reduce(
                      (acc, second) => acc + second.quantity,
                      0
                    )}
                    )
                  </TableCell>
                  <TableCell>
                    $
                    {cartProduct.reduce(
                      (acc, second) =>
                        acc + +(second.discountedPrice * second.quantity),
                      0
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">
                    Platform fee
                  </TableCell>
                  <TableCell>$14.44</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">
                    Total Amount
                  </TableCell>
                  <TableCell>
                    $
                    {cartProduct.reduce(
                      (acc, second) =>
                        acc + +(second.discountedPrice * second.quantity),
                      0
                    ) + 14.44}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Buy now</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Product Purchased Succesfully.
                  </DialogTitle>
                  <DialogDescription className="self-center">
                    <Lottie
                      animationData={successAnimation}
                      loop={true}
                      className="h-24 w-24"
                    />
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose>
                    <Button>Done</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default YourCart;
