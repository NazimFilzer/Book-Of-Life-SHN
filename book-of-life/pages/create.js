import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import Link from 'next/link'
import styles from '../styles/Dashboard.module.css';
import { useRouter } from "next/router";
import Head from "next/head";

export default function CreateProfile() {
  const User = supabaseClient.auth.user()
  const router=useRouter();
  if(typeof window != 'undefined') {
    const user = supabaseClient.auth.user()
    if(!user){
      router.push('/')
    }
  }
    

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({content: " " })
  const { content } = post;
  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data } = await supabaseClient
      .from('posts')
      .select().eq('userId', User?.id)
    setPosts(data)
  }

  async function createPost() {
    const userId = User?.id;
    await supabaseClient
      .from('posts')
      .insert([
        { content,userId }
      ])
    fetchPosts()
  }
 
  return (
    <>
    <Head>
        <title>Book Of Life | Create</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.dashboard_container_1}>
        <h2>Create a new Diary</h2>
        <TextField
          id="outlined-basic"
          label="Diary Entry"
          sx={{width:"100%"}}
          multiline
          minRows={4}
          value={content}
          onChange={e => { setPost({...posts,content: e.target.value }) }}
        />
       <Link href='/dashboard'><Button className={styles.dashboard_button_create}  variant="contained" onClick={createPost}>ADD DIARY ENTRY</Button></Link> 
      </div>
    </>
  )
}
