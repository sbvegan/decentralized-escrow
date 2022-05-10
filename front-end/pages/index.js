import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import InitializeEscrow from '../components/InitializeEscrow'
import { useMoralis } from 'react-moralis'

export default function Home() {
  const { isWeb3Enabled } = useMoralis()

  return (
    <div className={styles.container}>
      <Header />
      {isWeb3Enabled ?
        <>
          <InitializeEscrow />
        </> :
        <div>No wallet detected...</div>

      }
    </div>
  )
}
