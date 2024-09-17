"use server"

import prisma from "@repo/db/client";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";


export async function onRampTxn(provider: string, amount: number) {
    console.log(provider, amount);
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const token = Math.random().toString();
    if(!userId) return {message: "User not logged in"};
    await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            userId: Number(userId),
            provider,
            amount,
            token,
            startTime: new Date(),
        }
    });
    return {message: "Transaction added"};
}