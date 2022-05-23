import { useWeb3Contract, useMoralis } from "react-moralis";
import { Table, Avatar, Tag, Icon } from "web3uikit"
import { useState } from "react"
import { abi } from "../constants/escrow-factory-abi.json"

const ESCROW_FACTORY_ADDRESS = "0x6BF064fC1138f30744Edf593160Aea10754a6532";

export default function EscrowTable() {
    const [tableData, setTableData] = useState([
        [
            <Avatar isRounded size={36} theme="image" />,
            'Moralis Magi',
            '0x18...130e',
            '0x18...130e',
            '2022 May 27th',
            <div
                style={{ cursor: "pointer" }}
                onClick={() => console.log("click")} >
                <Icon fill="black" size={32} svg="usdc" />

            </div>
        ],
    ])
    // Todo: read escrow bets created by factory
    const { runContractFunction: getEscrowAddress } = useWeb3Contract({
        abi: abi,
        contractAddress: ESCROW_FACTORY_ADDRESS,
        functionName: "escrows",
        params: {} // Todo: its an array, need to pass index
    })


    return (
        <Table
            columnsConfig="80px 1fr 1fr 1fr 1fr 80px"
            data={tableData}
            header={[
                '',
                <span>Anchor Price</span>,
                <span>Bull</span>,
                <span>Bear</span>,
                <span>Payday</span>,
                <span>Bet</span>
            ]}
            maxPages={3}
            onPageNumberChanged={function noRefCheck() { }}
            pageSize={5}
        />
    )
}
