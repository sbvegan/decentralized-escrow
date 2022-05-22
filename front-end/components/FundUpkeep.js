import { Card, LinkTo, Input } from "web3uikit"

export default function FundUpkeep({ children }) {
    const links = <>
        <LinkTo
            address={`https://kovan.etherscan.io/tx/${children}`}
            text="Transaction" />
        <LinkTo
            address="https://keepers.chain.link/new"
            text="Register New Upkeep"
        />
    </>

    return (
        <>
            <Card
                title={links}
                description="Now that you've created an 
                escrow, take that address and register 
                it so the Chainlink Keepers to manage
                its UpKeep."
            >
            </Card>
        </>

    )
}