import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../amplify_outputs.json";
import './index.css'
import App from './main_app/App.tsx'
import Header from './header/Header.tsx'
Amplify.configure(outputs);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Authenticator signUpAttributes={['email', 'preferred_username']}>
      {({ signOut, user }) => (
        <>
          <Header />
          <App userInfo={user} signOutEvent={signOut} />
        </>
      )}
    </Authenticator>
    
  </StrictMode>,
)
