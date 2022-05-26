import { useWeb3Contract, useMoralis } from "react-moralis";
import { Input, DatePicker, Button } from "web3uikit"
import { useState, useEffect } from "react"
import { abi } from "../constants/escrow-factory-abi.json"
import FundUpkeep from "./FundUpkeep";


// on kovan
const ESCROW_FACTORY_ADDRESS = "0x6BF064fC1138f30744Edf593160Aea10754a6532";

export default function InitializeEscrow() {
    const { Moralis } = useMoralis();
    const [assetPriceFeed, setAssetPriceFeed] = useState("0x9326BFA02ADD2366b30bacB125260Af641031331")
    const [wager, setWager] = useState(Moralis.Units.Token("0.01", "18"))
    const [anchorPrice, setAnchorPrice] = useState("300000000000")
    const [paydayTimestamp, setPaydayTimestamp] = useState("1653609600")
    const [showLinks, setShowLinks] = useState(false)
    const [hash, setHash] = useState("")

    const { data, error, runContractFunction: createEscrow, isFetching, isLoading } = useWeb3Contract({
        chain: "kovan",
        abi: abi,
        contractAddress: ESCROW_FACTORY_ADDRESS,
        functionName: "createEscrow",
        params: {
            _assetPriceFeed: assetPriceFeed,
            _wager: wager,
            _anchorPrice: anchorPrice,
            _paydayTimestamp: paydayTimestamp
        }
    })

    const handleCreate = async () => {
        const tx = await createEscrow({
            onComplete: handleComplete,
            onError: handleError,
            onSuccess: handleSuccess
        })
        console.log("tx: ", tx)
    }

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


    return (

        <div style={{
            width: "33%",
            margin: "auto",
        }}>
            <br />
            <Input
                width="100%"
                label="Chainlink Price Feed Address"
                name="Chainlink Price Feed Address"
                onChange={(e) => setAssetPriceFeed(e.target.value)}
            />
            <br />
            <Input
                width="100%"
                label="Wager Size (ETH)"
                name="Wager Size"
                onChange={(e) => setWager(Moralis.Units.Token(e.target.value, "18"))}
                type="number"
            />
            <br />
            <Input
                width="100%"
                label="Anchor Price"
                name="Anchor Price"
                onChange={(e) => setAnchorPrice(e.target.value)}
                type="number"
            />
            <br />
            <DatePicker
                id="payday-date-picker"
                label="Payday"
                onChange={(e) => setPaydayTimestamp(e.target.value)}
            />
            <br />
            <Button
                color="blue"
                id="create-escrow-button"
                onClick={handleCreate}
                disabled={isFetching}
                text="Create Escrow"
                theme="colored"
                type="button"

            />
            {showLinks ?
                <FundUpkeep>{hash}</FundUpkeep>
                :
                <></>
            }
        </div >

    )
}