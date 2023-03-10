import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Register/Register';
import TopNavigation from './components/TopNavigation/TopNavigation';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import ExplorePage from './components/ExplorePage/ExplorePage';
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

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
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/creative-universe' component={() => {
            window.location.href = 'https://github.com/metagov/daostar/discussions/41';
            return null;
          }}/>
          <Route path='/' element={<Homepage />} />
        </Routes>
        </div> 
        
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

if (window.location.path === "creative-universe"){
  window.location = "https://github.com/metagov/daostar/discussions/41"
}

export default App;
 
