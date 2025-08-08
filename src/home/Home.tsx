import App from '../main_app/App.tsx'
import Header from '../header/Header.tsx'
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';

function Home(props: any) {
    const [username, setUsername] = useState<Partial<Record<string, string>> | null>(null);
    
    useEffect(() => {
            const getUserAttributes = async () => {
              try {
                const user = await fetchUserAttributes();
                setUsername(user);
                
              } catch (error) {
                console.error('Error fetching user attributes:', error);
                return {};
              }
            }
            getUserAttributes();
          }, []);

    return (
        <>
            <Header signOutEvent={props.signOut} />
            <App userInfo={username} />
         </>
    );
}

export default Home;

