import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "2rem",
            marginRight: "3rem"
        }}>
            <h1>Decentralilzed Escrow</h1>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}