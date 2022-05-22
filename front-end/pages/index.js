import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import InitializeEscrow from '../components/InitializeEscrow'
import FundUpkeep from '../components/FundUpkeep'
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
              <div>
                This is Card 2
              </div>
            </Tab>
          </TabList>
        </> :
        <div>No wallet detected...</div>

      }
    </div>
  )
}
