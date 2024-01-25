import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider'
import { RouterProvider } from "react-router-dom";
import { routes } from './routes/routes';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <div className='print-only'>
      <div className='container'>
        <AuthProvider>
          <RouterProvider router={routes}/>
        </AuthProvider>
      </div>
    </div>  
  // </React.StrictMode>
);
reportWebVitals();
