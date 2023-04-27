import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Register/Register';
import TopNavigation from './components/TopNavigation/TopNavigation';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import ExplorePage from './components/ExplorePage/ExplorePage';
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { useQuery } from '@apollo/client'

import queries from './components/ExplorePage/queries/registrations'

import './App.css';
import './bp4-theme.css';
import Eye from './components/Homepage/Eye/Eye';

const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
  }),
);

function App() {
    const { loading, error, data: mainnetData } = useQuery(queries.REGISTRATIONS, { context: { apiName: 'mainnet' }, variables: { id: 'mainnet' } })
    const goerliRes = useQuery(queries.REGISTRATIONS, { context: { apiName: 'goerli' }, variables: { id: 'goerli' } })
    const { loading: goerliLoading, error: goerliError, data: goerliData } = goerliRes
    // console.log({ mainnetData, goerliData })

    if (error || goerliError) return 'error'
    if (loading || goerliLoading) return 'loading...'
    const registrationInstances = mainnetData.registrationNetwork.registrations.concat(goerliData.registrationNetwork.registrations)

    console.log({ registrationInstances })

  return ( 
    <WagmiConfig client={client}>
      <ConnectKitProvider 
        mode='dark'
        customTheme={{
          "--ck-font-family": "IBM Plex Mono, 'Roboto Condensed', 'Roboto', 'Arial', sans-serif"
        }}
        options={{
          hideNoWalletCTA: true,
          walletConnectName: 'WalletConnect',
          showAvatar: false,
          hideQuestionMarkCTA: true
        }}
      >
      <div className="App">
        
        <TopNavigation />
        {/* <Homepage /> */}

        <Routes>
          <Route path='/eye' element={<Eye />} />
          <Route path='/register' element={<Register />} />
          <Route path='/registration/:regID' element={<RegistrationPage />} />
          <Route path='/explore' element={<ExplorePage registrationInstances={registrationInstances} />} />
          <Route path='/' element={<Homepage registrationInstances={registrationInstances} />} />
        </Routes>
        </div> 
        
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
 