import { useEffect, useState } from 'react'
import { Header, Main, Spacer } from './components/styled'
import { getDefaultSession, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'
import { loginToPod } from './pods'
import Search from './components/Search'

function App() {
  const [session, setSession] = useState({})
  const [username, setUsername] = useState()

  useEffect(() => {
    handleIncomingRedirect()
      .then(() => {
        let s = getDefaultSession();
        if (s.info && s.info.isLoggedIn) {
          console.info("Started session:", s.info.webId)
          setSession(s)
        }
      })
  }, [])

  useEffect(() => {
    if (session.info && session.info.isLoggedIn) {
      setUsername(session.info.webId.split("/").at(-1))
    }
  }, [session])

  return (
    <>
      <Header>
        Movies
        <Spacer />
        {
          username ?
            <p>{username}</p>
            : <button onClick={loginToPod}>login</button>
        }
      </Header>
      <Main>
        <Search />
      </Main>
    </>
  )
}

export default App
