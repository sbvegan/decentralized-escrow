import { useWeb3Contract } from "react-moralis";
import { Form } from "web3uikit"
import { useState } from "react"
import { abi } from "../constants/escrow-factory-abi.json"

// on kovan
const ESCROW_FACTORY_ADDRESS = "0x6BF064fC1138f30744Edf593160Aea10754a6532";

export default function InitializeEscrow() {

    const [assetPriceFeed, setAssetPriceFeed] = useState("")
    const [wager, setWager] = useState("")
    const [anchorPrice, setAnchorPrice] = useState("")
    const [paydayTimestamp, setPaydayTimestamp] = useState("")

    const { runContractFunction: createEscrow } = useWeb3Contract({
        abi: abi,
        address: ESCROW_FACTORY_ADDRESS,
        functionName: "createEscrow",
        params: {
            _assetPriceFeed: assetPriceFeed,
            _wager: wager,
            _anchorPrice: anchorPrice,
            _paydayTimestamp: paydayTimestamp
        }
    })

    const printParameters = () => {
        console.log(`Asset Price Feed: ${assetPriceFeed}`)
        console.log(`Wager: ${wager}`)
        console.log(`Anchor Price: ${anchorPrice}`)
        console.log(`Payday Timestamp: ${paydayTimestamp}`)
    }

    const handleCreation = async (data) => {
        const formInput = data.data
        setAssetPriceFeed(formInput[0].inputResult)
        setWager(formInput[1].inputResult)
        setAnchorPrice(formInput[2].inputResult)
        setPaydayTimestamp(formInput[3].inputResult)
        createEscrow()
    }



    return (
        <div>
            <Form
                buttonConfig={{
                    isLoading: false,
                    loadingText: 'Creating Escrow...',
                    text: 'Create Escrow',
                    theme: 'primary'
                }}
                data={[
                    {
                        inputWidth: '100%',
                        name: 'Chainlink Asset Price Feed Address',
                        type: 'text',
                        // TODO: add address validation regex
                        // validation: {
                        //    regExp: '',
                        //    required: true
                        // },function noRefCheck() { }DO: needs validation for no negative numbers
                        // validation: {
                        //     required: true
                        // },
                        value: ''
                    },
                    {
                        inputWidth: '100%',
                        name: 'Wager Size',
                        type: 'number',
                        value: ''
                    },
                    {
                        inputWidth: '100%',
                        name: 'Anchor Price (the high or low point)',
                        type: 'number',
                        // TODO: needs validation for no negative numbers
                        // validation: {
                        //     required: true
                        // },
                        value: ''
                    },
                    {
                        name: 'Payday (when the day the bet ends )',
                        type: 'date',
                        value: ''
                    }

                ]}
                onSubmit={handleCreation}
                title="Escrow creation form"
            />
        </div>
    )
}