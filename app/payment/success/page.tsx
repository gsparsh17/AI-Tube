import { addCoins, clearCache } from "@/actions/commonActions";
import prisma from "@/lib/db.config";
import { getCoinsFromAmount } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";

export default async function SuccessTxn({
  searchParams,
}: {
  searchParams: URLSearchParams; // Use URLSearchParams for proper type alignment
}) {
  // Extract txnId from searchParams
  const txnId = searchParams.get("txnId"); // Use `get` method for query params

  // Validate txnId
  if (!txnId) {
    return notFound();
  }

  try {
    // Fetch the transaction
    const transaction = await prisma.transactions.findFirst({
      where: {
        id: txnId,
        status: 2, // Ensure the transaction has a status of 2
      },
    });

    console.log("The transaction is", transaction);

    // If transaction not found, show 404
    if (!transaction) {
      return notFound();
    }

    // Update the transaction status to 'success' (1)
    await prisma.transactions.update({
      data: {
        status: 1, // Assuming 1 indicates 'success'
      },
      where: {
        id: txnId,
      },
    });

    // Add coins to the user's account
    await addCoins(transaction.user_id, getCoinsFromAmount(transaction.amount));

    // Clear related caches
    clearCache("userCoins");
    clearCache("transactions");

    return (
      <div className="h-screen flex justify-center items-center flex-col">
        <Image src="/images/check.png" width={512} height={512} alt="success" />
        <h1 className="text-3xl font-bold text-green-400">
          Payment Processed Successfully!
        </h1>
      </div>
    );
  } catch (error) {
    console.error("Error processing the transaction:", error);
    return (
      <div className="h-screen flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold text-red-400">
          Something went wrong. Please try again later.
        </h1>
      </div>
    );
  }
}
