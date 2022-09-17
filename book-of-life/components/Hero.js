import styles from './Hero.module.css'
import Button from '@mui/material/Button';
import supabaseClient from '../utils/supabaseClient';
import {useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { borderRight } from '@mui/system';
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
      <div className={styles.hero_container} >
        <Image src="/logo.png" width="200" height="200" />

        <Button className={styles.hero_button} variant="contained" onClick={signInWithGoogle}><Image style={{ padding:"10px" }}src="/google.png" width="20" height="20" />
Login with Google</Button>
      </div>
    )
  }
