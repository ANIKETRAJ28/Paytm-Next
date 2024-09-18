"use server"

import prisma from "@repo/db/client";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";


export async function p2pTxn(senderNumber: string, amount: number) {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const token = Math.random().toString();
    if(!userId) return {message: "User not logged in"};
    const sender = await prisma.user.findUnique({
        where: {
            number: senderNumber
        }
    });
    if(!sender) return {message: "Sender doesnot exists"};
    await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            userId: sender.id,
            amount,
            token,
            provider: '',
            startTime: new Date(),
        }
    });
    return {message: "Transaction added"};
}