"use client";
import { useEffect, useState } from "react";
import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import {
  encodeURL,
  createQR,
  findReference,
  validateTransfer,
} from "@solana/pay";
import BigNumber from "bignumber.js";
import { useRouter, useSearchParams } from "next/navigation";

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amountToPay = searchParams.get("amount");
  const referenceString = searchParams.get("reference");

  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const timeoutDuration = 300000; // 5 minutes timeout
    const checkInterval = 5000; // Poll every 5 seconds
    const maxAttempts = timeoutDuration / checkInterval;

    async function initiatePayment() {
      try {
        console.log("1. ✅ Establish connection to the network");
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        console.log("2. 🛍 Simulate a customer checkout \n");

        const recipient = new PublicKey(
          "GZuj9nLDiGVe9f8o4XCqYE3k4Z6DYvvbv7VxoMqeHskf"
        );
        const amount = new BigNumber(amountToPay || 0);
        const reference = new PublicKey(
          referenceString || Keypair.generate().publicKey.toString()
        );

        const label = "Store";
        const message = "Thanks for shopping with us!";
        const memo = "#solana";

        console.log("3. 💰 Create a payment request link \n");
        const url = encodeURL({
          recipient,
          amount,
          reference,
          label,
          message,
          memo,
        });

        const qrCode = createQR(url);
        const element = document.getElementById("qr-code");
        if (element) {
          element.innerHTML = ""; // Clear previous QR codes
          qrCode.append(element);
        }

        console.log("4. ⏳ Waiting for payment status");

        let attempts = 0;
        intervalId = setInterval(async () => {
          if (attempts >= maxAttempts) {
            setPaymentStatus("timeout");
            clearInterval(intervalId);
            return;
          }

          try {
            const signatureInfo = await findReference(
              connection,
              new PublicKey(
                referenceString || Keypair.generate().publicKey.toString()
              ),
              { finality: "confirmed" }
            );

            try {
              await validateTransfer(connection, signatureInfo.signature, {
                recipient,
                amount: new BigNumber(amountToPay || 0),
              });
              setPaymentStatus("validated");
              clearInterval(intervalId);
            } catch (error) {
              console.error("❌ Payment validation failed", error);
            }
          } catch (error) {
            console.error("❌ Transaction not found", error);
          }

          attempts += 1;
        }, checkInterval);

        setTimeout(() => {
          if (paymentStatus === "pending") {
            router.push(`/payment-status?status=timeout`);
          }
          clearInterval(intervalId);
        }, timeoutDuration);
      } catch (error) {
        console.error("Error initiating payment:", error);
      }
    }

    initiatePayment();

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(intervalId);
    };
  }, [router, amountToPay, referenceString, paymentStatus]);

  useEffect(() => {
    if (paymentStatus === "validated") {
      setTimeout(() => {
        router.push(`/payment-status?status=validated`);
      }, 0);
    }
    if (paymentStatus === "timeout") {
      setTimeout(() => {
        router.push(`/payment-status?status=timeout`);
        setTimeout(() => {
          router.push(`/`);
        }, 5000);
      }, 0);
    }
  }, [paymentStatus, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>
      <p className="text-lg text-gray-600 mb-6">
        Please scan the QR code below to complete your payment.
      </p>
      <div id="qr-code" className="mb-6"></div>
      {paymentStatus === "pending" && (
        <p className="text-lg text-gray-600">
          Waiting for payment confirmation...{" "}
          <span className="font-semibold">{Math.max(timeLeft, 0)}s</span>
        </p>
      )}
    </div>
  );
};

export default CheckoutPage;
