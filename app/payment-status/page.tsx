"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentStatusPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [countdownActive, setCountdownActive] = useState(false);
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "validated" || status === "timeout" || status === "failed") {
      // Start countdown for all statuses
      setCountdownActive(true);
      const timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push(`/`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [status, router]);

  const renderStatusMessage = () => {
    switch (status) {
      case "validated":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Thanks for Shopping!
            </h1>
            <p className="text-lg text-gray-700">
              Your payment has been successfully validated.
            </p>
            {countdownActive && (
              <p className="text-lg text-gray-700 mt-4">
                Redirecting to homepage in {secondsLeft} seconds...
              </p>
            )}
          </div>
        );
      case "timeout":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Payment Timeout
            </h1>
            <p className="text-lg text-gray-700">
              The payment process timed out. Redirecting to homepage in{" "}
              {secondsLeft} seconds...
            </p>
          </div>
        );
      case "failed":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Payment Failed
            </h1>
            <p className="text-lg text-gray-700">
              Payment validation failed or transaction not found. Redirecting to
              homepage in {secondsLeft} seconds...
            </p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Payment Status
            </h1>
            <p className="text-lg text-gray-700">
              Status information is not available.
            </p>
          </div>
        );
    }
  };

  return <div>{renderStatusMessage()}</div>;
};

export default PaymentStatusPage;
