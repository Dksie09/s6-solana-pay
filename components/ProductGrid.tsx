"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import products from "../products.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface ProductGridProps {
  addToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ addToCart }) => {
  const [addedProductIds, setAddedProductIds] = useState<number[]>([]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedProductIds((prev) => [...prev, product.id]);

    // Reset the button after 2 seconds
    setTimeout(() => {
      setAddedProductIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className=" border border-black hover:scale-10 hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 ease-in-out"
        >
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-20 object-contain"
            />
          </CardHeader>
          <CardContent>
            <div className=" flex justify-between">
              <p>Price: {product.price} SOL</p>
            </div>
            <CardDescription>{product.description}</CardDescription>
            <Button
              className={`mt-5 w-full border transition-all duration-300 ${
                addedProductIds.includes(product.id)
                  ? "bg-green-950 text-white"
                  : ""
              }`}
              onClick={() => handleAddToCart(product)}
              disabled={addedProductIds.includes(product.id)}
            >
              {addedProductIds.includes(product.id) ? "Added" : "Add to Cart"}
            </Button>

            {/* <div className=" w-full flex justify-evenly my-2">
              <Button variant="outline" className="rounded-full" size="icon">
                <Minus className="h-4 w-4" />
              </Button>
              <span className=" text-2xl">1</span>
              <Button variant="outline" className="rounded-full" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
