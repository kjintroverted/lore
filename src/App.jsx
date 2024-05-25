import { useEffect, useState } from 'react'
import { Header, Main, Spacer } from './components/styled'
import { getDefaultSession, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'
import { loginToPod } from './pods'

function App() {
  const [count, setCount] = useState(0)
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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </Main>
    </>
  )
}

export default App
