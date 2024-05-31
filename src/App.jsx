import { useEffect, useState } from 'react'
import { Header, Main, Spacer } from './components/styled'
import { getDefaultSession, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'
import { getDataSet, getProfile, initThing, loadDataset, loginToPod, saveThing } from './util/pods'
import Search from './components/Search'
import { movieShape } from './util/shapes'
import { getAllMovies } from './util/util'

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
    getDataSet(session, `${profile.storageURL}/lore/movies`).then(setMovieDataset);
  }, [profile]);

  // Load saved movies
  useEffect(() => {
    if (!movieDataset) return
    loadDataset(movieDataset, { shape: movieShape })
      .then(getAllMovies)
      .then(console.log)
  }, [movieDataset])

  async function saveMovie(movie) {
    let { dataset } = await initThing(
      movie,
      movieShape,
      {
        id: movie.id,
        dataset: movieDataset,
        fetch: session.fetch
      });
    setMovieDataset(dataset);
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
