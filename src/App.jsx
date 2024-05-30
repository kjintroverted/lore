import { useEffect, useState } from 'react'
import { Header, Main, Spacer } from './components/styled'
import { getDefaultSession, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'
import { getDataSet, getProfile, loginToPod, saveThing } from './pods'
import Search from './components/Search'

function App() {
  const [session, setSession] = useState();
  const [profile, setProfile] = useState();
  const [movieDataset, setMovieDataset] = useState();

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
      getProfile(session).then(setProfile);
    }
  }, [session]);

  // Get App data
  useEffect(() => {
    if (!profile || !profile.storageURL) return
    getDataSet(session, profile.storageURL).then(setMovieDataset);
  }, [profile]);

  function saveMovie(movie) {
    saveThing(movieDataset, movie)
  }

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
          session && <Search select={saveMovie} />
        }
      </Main>
    </>
  )
}

export default App
