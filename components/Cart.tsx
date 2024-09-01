"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface CartProps {
  cart: Product[];
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart }) => {
  const router = useRouter();

  const totalSol = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    router.push(`/checkout?amount=${totalSol}`);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button>View Cart</Button>
        </SheetTrigger>
        <SheetContent className="overflow-scroll">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Review your items before proceeding to checkout.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-4">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-gray-100 shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="w-full">
                      <div className="flex justify-between items-center w-full">
                        <h3 className="text-base font-semibold">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash className="h-5" />
                        </button>
                      </div>
                      <span className="text-xl">{item.price} SOL</span>
                    </div>
                  </div>
                </div>
              ))
            )}
            {cart.length > 0 && (
              <>
                <div className="pt-4 text-lg font-bold">
                  Total: {totalSol} SOL
                </div>
                <Button
                  className="mt-4 w-full bg-black text-white font-bold py-2 px-4 rounded"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
