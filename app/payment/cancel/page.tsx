import { clearCache } from "@/actions/commonActions";
import prisma from "@/lib/db.config";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function CancelTxn({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Extracting txnId from searchParams
  const txnId = searchParams["txnId"];

  if (!txnId) {
    return notFound();
  }

  // Fetch the transaction using a unique identifier
  const transaction = await prisma.transactions.findUnique({
    where: {
      id: txnId,
    },
  });

  console.log("The transaction is", transaction);

  // If the transaction doesn't exist or has a different status, show 404
  if (!transaction || transaction.status !== 2) {
    return notFound();
  }

  // Update the transaction status to 'canceled'
  await prisma.transactions.update({
    data: {
      status: 0, // Assuming 0 indicates 'canceled'
    },
    where: {
      id: txnId,
    },
  });

  // Clear transaction-related cache
  clearCache("transactions");

  return (
    <div className="h-screen flex justify-center items-center flex-col ">
      <Image src="/images/cancel.png" width={512} height={512} alt="cancel" />
      <h1 className="text-3xl font-bold text-red-400">
        Payment Canceled by the User
      </h1>
    </div>
  );
}
