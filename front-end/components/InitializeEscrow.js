import { useWeb3Contract, useMoralis } from "react-moralis";
import { Form, Input, DatePicker, Button } from "web3uikit"
import { useState } from "react"
import { abi } from "../constants/escrow-factory-abi.json"


// on kovan
const ESCROW_FACTORY_ADDRESS = "0x6BF064fC1138f30744Edf593160Aea10754a6532";

export default function InitializeEscrow() {
    const { Moralis } = useMoralis();
    const [assetPriceFeed, setAssetPriceFeed] = useState("0x9326BFA02ADD2366b30bacB125260Af641031331")
    const [wager, setWager] = useState(Moralis.Units.Token("0.01", "18"))
    const [anchorPrice, setAnchorPrice] = useState("300000000000")
    const [paydayTimestamp, setPaydayTimestamp] = useState("1653609600")

    const { runContractFunction: createEscrow } = useWeb3Contract({
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

    const handleComplete = async (tx) => {
        console.log("COMPLETE")
    }

    const handleError = async (error) => {
        console.error("ERROR")
        console.log(error)
    }

    const handleSuccess = async (tx) => {
        console.log("SUCCESS")
        console.log(tx)
    }


    return (
        <div>
            <Input
                label="Chainlink Price Feed Address"
                name="Chainlink Price Feed Address"
                onChange={(e) => setAssetPriceFeed(e.target.value)}
            />
            <Input
                label="Wager Size"
                name="Wager Size"
                onChange={(e) => setWager(Moralis.Units.Token(e.target.value, "18"))}
                type="number"
            />
            <Input
                label="Anchor Price"
                name="Anchor Price"
                onChange={(e) => setAnchorPrice(e.target.value)}
                type="number"
            />
            <DatePicker
                id="payday-date-picker"
                label="Payday"
                onChange={(e) => setPaydayTimestamp(e.target.value)}
            />
            <Button
                color="blue"
                id="create-escrow-button"
                onClick={async () => {
                    await createEscrow({
                        onComplete: handleComplete,
                        onError: handleError,
                        onSuccess: handleSuccess
                    })
                }}
                text="Create Escrow"
                theme="colored"
                type="button"
            />
        </div>
    )
}