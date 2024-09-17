"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { onRampTxn } from "../app/lib/onRampTxn";

const SUPPORTED_BANKS = [{
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com"
    }, {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com"
    }
];

export const AddMoney = () => {

    const [transaction, setTransaction] = useState({
        redirectUrl: '',
        amount: '',
        provider: '',
    });

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput label="Amount" placeholder="Amount" onChange={(e) => setTransaction({...transaction, amount: e})}/>
                <div className="py-4 text-left">Bank</div>
                <Select 
                    onSelect={(value) => setTransaction({...transaction, 
                        redirectUrl: SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "", 
                        provider: SUPPORTED_BANKS.find(x => x.name === value)?.name || ""
                    })}
                    options={SUPPORTED_BANKS.map(x => ({
                            key: x.name,
                            value: x.name
                        })
                    )}
                />

                <div className="flex justify-center pt-4">
                    <Button onClick={() => onRampTxn(transaction.provider, parseInt(transaction.amount)*100)}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    );
}