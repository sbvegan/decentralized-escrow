import { useWeb3Contract } from "react-moralis";
import { Form } from "web3uikit"
import { useState } from "react"

export default function InitializeEscrow() {

    // TODO: add state for smart contract initialization parameters
    const [assetPriceFeed, setAssetPriceFeed] = useState("")

    return (
        <div>
            <Form
                buttonConfig={{
                    onClick: function noRefCheck() { },
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
                onSubmit={function noRefCheck() { }}
                title="Escrow creation form"
            />
        </div>
    )
}