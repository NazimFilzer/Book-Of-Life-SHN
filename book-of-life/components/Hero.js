import styles from './Hero.module.css'
import Button from '@mui/material/Button';
import supabaseClient from '../utils/supabaseClient';
import {useRouter } from 'next/router'
import { useEffect, useState } from 'react';
export default function Hero() {
  useEffect(() => {
    const user = supabaseClient.auth.user()
    if(user){
      router.push('/dashboard')
    }
  }, [])

  const router=useRouter();
    async function signInWithGoogle() {
        const { user, session, error } = await supabaseClient.auth.signIn({
          provider: 'google',
        })
        if(user)
        {
          router.push('/dashboard')
        }
      }
    return (
      <div className={styles.hero_container}>
        j;klxkx
        <div style={{fontSize:"35px",fontWeight:"800"}}>BOOK OF LIFE</div>
        <Button variant="contained" onClick={signInWithGoogle}>Login with Google</Button>
      </div>
    )
  }



  