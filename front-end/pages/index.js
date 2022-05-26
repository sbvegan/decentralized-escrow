import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import InitializeEscrow from '../components/InitializeEscrow'
import EscrowTable from '../components/EscrowTable'
import { useMoralis } from 'react-moralis'
import { TabList, Tab } from 'web3uikit'
export default function Home() {
  const { isWeb3Enabled } = useMoralis()

  return (
    <div className={styles.container}>
      <Header />
      {isWeb3Enabled ?
        <>
          <TabList
            defaultActiveKey={1}
            tabStyle="bulbUnion"
            style={{
              marginLeft: "2rem",

              display: "flex",
              alignContent: "end",
              margin: "auto",
            }}
          >
            <Tab
              tabKey={1}
              tabName="Initialize Escrow"
            >
              <InitializeEscrow />
            </Tab>
            <Tab
              tabKey={2}
              tabName="Place Your Bets"
            >
              <EscrowTable />
            </Tab>
          </TabList>
        </> :
        <div style={{ marginTop: "4px", marginLeft: "22px" }}>No wallet detected...</div>

      }
    </div>
  )
}
