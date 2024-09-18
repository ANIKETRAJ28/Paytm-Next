"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { onRampTxn } from "../app/lib/onRampTxn";
import { p2pTxn } from "../app/lib/pspTxn";

export function SendCard() {
    const [transaction, setTransaction] = useState({
        number: "",
        amount: ""
    });

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setTransaction({...transaction, number: value});
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setTransaction({...transaction, amount: value});
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={() => p2pTxn(transaction.number, Number(transaction.amount)*100)}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}