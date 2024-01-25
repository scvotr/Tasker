import './App.css'
import { Outlet } from 'react-router-dom'
import { Header } from './components/MainPageLayouts/Header/Header'
import { Footer } from './components/MainPageLayouts/Footer/Footer'
import { useAuthContext } from './context/AuthProvider'
import {  useEffect } from "react"
import ErrorBoundary from './ErrorBoundary'


function App() {
  const getCurrentUserData = useAuthContext()

  useEffect(()=>{
    getCurrentUserData.checkToken();
    getCurrentUserData.getUserData();
  }, [getCurrentUserData])
  
  return (
    <ErrorBoundary >
      <div className="grid-container">
        <Header />
        <div className='main__body'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
