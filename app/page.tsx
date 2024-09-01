"use client";
import React, { useState } from "react";
import Cart from "@/components/Cart";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevCart.map((p) => (p.id === product.id ? { ...p } : p));
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <main className="p-10 flex flex-col items-center justify-center ">
      <Header />
      <div className="flex flex-col gap-2">
        <Cart cart={cart} removeFromCart={removeFromCart} />
      </div>
      <div className="md:size-5/6 lg:w-3/5 my-20">
        <ProductGrid addToCart={addToCart} />
      </div>
    </main>
  );
}
