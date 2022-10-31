import { Route, Routes } from 'react-router-dom';
import { Web3Modal, useAccount } from '@web3modal/react';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Register/Register';
import TopNavigation from './components/TopNavigation/TopNavigation';
import './App.css';
import './bp4-theme.css';
import { useEffect } from 'react';

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
    console.log('account', account);
  }, [account]);

  return (
    <div className="App">
      <TopNavigation />
      {/* <Homepage /> */}
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Homepage />} />
      </Routes>
      <Web3Modal config={config} />
    </div> 
  );
}

export default App;
 