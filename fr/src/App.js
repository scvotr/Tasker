import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './components/MainPageLayouts/Header/Header';
import { Footer } from './components/MainPageLayouts/Footer/Footer'
import { useEffect } from 'react';
import { useAuthContext } from './context/AuthProvider';

function App() {
  const getCurrentUserData = useAuthContext()

  useEffect(()=>{
    getCurrentUserData.checkToken();
    getCurrentUserData.getUserData();
  }, [getCurrentUserData])
  
  return (
    <div className="grid-container">
      <Header/>
      <div className='main__body'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
