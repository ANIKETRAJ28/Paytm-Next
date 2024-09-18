import { SendCard } from "../../../components/SendCard";

export default async function() {
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            P2P Tranfer
        </div>
        <SendCard/>
    </div>
}