import { Button } from "@mui/material";
import supabaseClient from "../utils/supabaseClient";
import styles from './Dashboard.module.css'
export default function Dashboard() {
    async function signout() {
        const { error } = await supabaseClient.auth.signOut()
      }
      const User= supabaseClient.auth.user()
      console.log(User)
  return (
    <>
    <div className={styles.dashboard_container}>
      Dashboard
      <Button variant="contained">{User.user_metadata.name}</Button>
      <Button variant="contained" onClick={signout}>Signout</Button>
      </div>
    </>
  )
}
