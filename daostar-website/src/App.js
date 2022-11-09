import { Route, Routes } from 'react-router-dom';
import { Web3Modal, useAccount } from '@web3modal/react';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Register/Register';
import TopNavigation from './components/TopNavigation/TopNavigation';
import './App.css';
import './bp4-theme.css';
import { useEffect } from 'react';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import ExplorePage from './components/ExplorePage/ExplorePage';

function App() {

  const config = {
    projectId: '<YOUR_PROJECT_ID>',
    theme: 'dark',
    accentColor: 'default',
    ethereum: { 
      appName: 'DAOstar'
    }
  }

  const { account, isReady } = useAccount();

  useEffect(() => {
  }, [account]);

  return ( 
    <div className="App">
      <TopNavigation />
      {/* <Homepage /> */}
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/registration/:regID' element={<RegistrationPage />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/' element={<Homepage />} />
      </Routes>
      <Web3Modal config={config} />
    </div> 
  );
}

export default App;
 