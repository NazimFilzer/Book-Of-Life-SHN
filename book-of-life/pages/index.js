import { useState, useEffect } from 'react'
import supabaseClient from '../utils/supabaseClient'
import Hero from '../components/Hero'
import Dashboard from './dashboard'
import Head from 'next/head'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    let mounted = true

    const { subscription } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      mounted = false

      subscription?.unsubscribe()
    }
  }, [])

  return (<>
  <Head>
        <title>Book Of Life</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Hero />
      ) : (
        <Dashboard/>
      )}
    </div>
    </>
  )
}
