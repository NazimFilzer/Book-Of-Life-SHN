import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import Link from 'next/link'
import styles from '../components/Dashboard.module.css';

export default function CreateProfile() {
  async function signout() {
    const { error } = await supabaseClient.auth.signOut()
  }
  const User = supabaseClient.auth.user()

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({content: " " })
  const { content } = post;
  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data } = await supabaseClient
      .from('posts')
      .select().eq('userId', User.id)
    setPosts(data)
  }

  async function createPost() {
    const userId = User.id;
    await supabaseClient
      .from('posts')
      .insert([
        { content,userId }
      ])
    fetchPosts()
  }
 
  return (
    <>
      <div className={styles.dashboard_container}>
        Create a new Post
        <TextField
          id="outlined-basic"
          label="Diary Entry"
          sx={{width:"60%"}}
          multiline
          minRows={4}
          value={content}
          onChange={e => { setPost({...posts,content: e.target.value }) }}
        />
       <Link href='/'><Button variant="contained" onClick={createPost}>ADD DIARY ENTRY</Button></Link> 
      </div>
    </>
  )
}
