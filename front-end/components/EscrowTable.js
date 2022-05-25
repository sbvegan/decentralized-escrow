import { useWeb3Contract, useMoralis } from "react-moralis";
import { Table, Avatar, Tag, Icon } from "web3uikit"
import { useEffect, useState } from "react"
import { abi } from "../constants/escrow-factory-abi.json"

const ESCROW_FACTORY_ADDRESS = "0x6BF064fC1138f30744Edf593160Aea10754a6532";

export default function EscrowTable() {
    const { isWeb3Enabled } = useMoralis
    const [showModal, setShowModal] = useState(false)
    const [tableData, setTableData] = useState([
        [
            <Avatar isRounded size={36} theme="image" />,
            'Moralis Magi',
            '0x18...130e',
            '0x18...130e',
            '2022 May 27th',
            <div
                style={{ cursor: "pointer" }}
                onClick={setShowModal} >
                <Icon fill="black" size={32} svg="usdc" />

            </div>
        ],
    ])
    const [index, setIndex] = useState(0)
    const [d, setD] = useState("n/a")

    // Todo: read escrow bets created by factory
    const { data, error, runContractFunction: getEscrowAddress } = useWeb3Contract({
        abi: abi,
        contractAddress: ESCROW_FACTORY_ADDRESS,
        functionName: "escrows",
        params: { "0": "0" } // Todo: its an array, need to pass index
    })

    const handleComplete = async (tx) => {
        console.log("COMPLETE")
        console.log(tx)
    }

    const handleError = async (err) => {
        console.error("ERROR")
        console.error(err)
    }

    const handleSuccess = async (results) => {
        console.log("SUCCESS")
        setHash(results.hash)
        setShowLinks(true)
    }

    const fetchEscrows = async () => {
        console.log("fetchEscrows")
        const res = await getEscrowAddress({
            onComplete: handleComplete,
            onError: handleError,
            onSuccess: handleSuccess
        })
        console.log(res)
        setD(res)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            getEscrowAddress({
                onComplete: handleComplete,
                onError: handleError,
                onSuccess: handleSuccess
            })
        }
    }, [isWeb3Enabled])


    return (
        <>
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

            <div>data: {data && <pre>{JSON.stringify(data)}</pre>}</div>
        </>
    )
}
