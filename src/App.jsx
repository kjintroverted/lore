import { useEffect, useState } from 'react'
import { Header, Main, Spacer } from './components/styled'
import { getDefaultSession, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'
import { getProfile, loginToPod } from './util/pods'
import Dashboard from './components/Dashboard'

function App() {
  const [session, setSession] = useState();
  const [profile, setProfile] = useState();

  // Start login process
  // Handle login redirect
  useEffect(() => {
    handleIncomingRedirect()
      .then(() => {
        let s = getDefaultSession();
        if (s.info && s.info.isLoggedIn) {
          console.info("Started session:", s.info.webId)
          setSession(s)
        }
      })
  }, []);

  // Get user info
  useEffect(() => {
    if (session && session.info.isLoggedIn) {
      getProfile(session)
        .then(setProfile);
    }
  }, [session]);

  return (
    <>
      <Header>
        Movies
        <Spacer />
        {
          profile ?
            <p>{profile.username}</p>
            : <button onClick={loginToPod}>login</button>
        }
      </Header>
      <Main>
        {
          profile && <Dashboard
            appData={{
              fetch: session.fetch,
              storageURL: profile.storageURL
            }}
          />
        }
      </Main>
    </>
  )
}

export default App
