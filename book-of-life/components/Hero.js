import styles from './Hero.module.css'
import Button from '@mui/material/Button';
import supabaseClient from '../utils/supabaseClient';
export default function Hero() {
    async function signInWithGoogle() {
        const { user, session, error } = await supabaseClient.auth.signIn({
          provider: 'google',
        })
      }
    return (
      <div className={styles.hero_container}>
        <Button variant="contained" onClick={signInWithGoogle}>Login with Google</Button>
      </div>
    )
  }
  