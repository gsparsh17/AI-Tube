import { clearCache } from "@/actions/commonActions";
import prisma from "@/lib/db.config";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CancelTxn({
  searchParams,
}: {
  searchParams: any; // Shortcut: Bypass type-checking for searchParams
}) {
  const txnId = searchParams["txnId"];

  // Validate txnId
  if (!txnId) {
    return notFound();
  }

  // Fetch the transaction
  const transaction = await prisma.transactions.findUnique({
    where: {
      id: txnId,
      status: 2,
    },
  });

  if (!transaction) {
    return notFound();
  }

  // Update transaction status
  await prisma.transactions.update({
    where: {
      id: txnId,
    },
    data: {
      status: 0,
    },
  });

  // Clear cache
  clearCache("transactions");

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <Image src="/images/cancel.png" width={512} height={512} alt="cancel" />
      <h1 className="text-3xl font-bold text-red-400">
        Payment Canceled by the User
      </h1>
    </div>
  );
}
