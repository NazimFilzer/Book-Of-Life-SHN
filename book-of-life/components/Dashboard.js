import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import styles from './Dashboard.module.css';

export default function Dashboard() {
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
        Dashboard
        <Button variant="contained">{User.user_metadata.name}</Button>
        <Button variant="contained" onClick={signout}>Signout</Button>
        <input
          placeholder="Content"
          value={content}
          onChange={e => { setPosts({...posts,content: e.target.value }) }}
        />

        <Button variant="contained" onClick={createPost}>Create POST</Button>
        {posts.map(post => (
            <div key={post.id}>
              <h3>{post.created_at.substring(0,10)} </h3>
              <p>{post.content} </p>
            </div>
          ))
        }
      </div>
    </>
  )
}
