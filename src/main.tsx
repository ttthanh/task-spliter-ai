import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../amplify_outputs.json";
import './index.css'
import Home from './home/Home.tsx'
import Admin from './admin/Admin.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
Amplify.configure(outputs);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Authenticator signUpAttributes={['email', 'preferred_username']}>
      {({ signOut }) => (
        <Router>
          <Routes>
            <Route path="/" element={<Home signOut={signOut} />}/>
            <Route path="/admin" element={<Admin />}/>
          </Routes>
        </Router>
        
      )}
    </Authenticator>
    
  </StrictMode>,
)
