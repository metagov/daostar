import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Register/Register';
import TopNavigation from './components/TopNavigation/TopNavigation';
import './App.css';
import './bp4-theme.css';

function App() {
  return (
    <div className="App">
      <TopNavigation />
      {/* <Homepage /> */}
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Homepage />} />
      </Routes>
     
    </div> 
  );
}

export default App;
 