"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const amountFromQuery = searchParams.get("amount");
    if (amountFromQuery) {
      setAmount(parseFloat(amountFromQuery));
    }
  }, [searchParams]);

  return (
    <main className="p-24 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="text-base">Thanks for shopping with us.</p>
      <p className="text-lg my-10">Total Amount: {amount} SOL</p>
      <div className="mt-10 flex justify-center items-center gap-10">
        <div>qr code</div> or
        <Button>Connect wallet</Button>
      </div>
    </main>
  );
}
