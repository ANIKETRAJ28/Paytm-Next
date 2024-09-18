"use server"

import prisma from "@repo/db/client";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";

export async function p2pTxn(senderNumber: string, amount: number) {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    if (!userId) return { message: "User not logged in" };

    const sender = await prisma.user.findUnique({ where: { number: senderNumber } });
    if (!sender) return { message: "Sender does not exist" };

    if (amount <= 0) return { message: "Amount must be greater than zero" };

    const result = await prisma.$transaction(async (tx) => {
        // Fetch and lock the sender's balance
        const [senderDetails] = await tx.$queryRaw<{
            id: number;
            userId: number;
            amount: number;
            locker: number;
        }[]>`SELECT * FROM "Balance" WHERE "userId" = ${Number(sender.id)} FOR UPDATE`;
        // Check if sender has sufficient balance
        if (!senderDetails || senderDetails.amount < amount) {
            return { message: "Insufficient balance" };
        }
        // Fetch and lock the receiver's balance
        const [receiverDetails] = await tx.$queryRaw<{
            id: number;
            userId: number;
            amount: number;
            locker: number;
        }[]>`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;
        // If receiver's balance doesn't exist, create it
        if (!receiverDetails) return { message: "Reciver doesnot exists" };
        // Update sender's balance
        await tx.$queryRaw`UPDATE "Balance" SET "amount" = "amount" - ${amount} WHERE "userId" = ${Number(sender.id)}`;
        // Update receiver's balance
        await tx.$queryRaw`UPDATE "Balance" SET "amount" = "amount" + ${amount} WHERE "userId" = ${Number(userId)}`;
        return { message: "Transaction completed successfully" };
    });

    return result;
}
