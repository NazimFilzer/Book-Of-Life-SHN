import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import styles from './Dashboard.module.css';
import Link from 'next/link'

export default function Dashboard() {
  async function signout() {
    const { error } = await supabaseClient.auth.signOut()
  }
  const User = supabaseClient.auth.user()

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ content: " " })
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

  
  function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
  return (
    <>
      <div className={styles.dashboard_container}>
        Dashboard
        <Button variant="contained">{User.user_metadata.name}</Button>
        <Button variant="contained" onClick={signout}>Signout</Button>
        <Link href='/create'><Button variant="contained">Create POST</Button></Link>
        <div className={styles.posts_container}>
          {posts.map(post => (
            <div key={post.id} style={{ backgroundColor: getRandomColor(), width: "400px", padding: "10px", borderRadius: "5px", border: "1px solid", boxShadow: "5px 10px #888888" }}>
              <h3>{post.created_at.substring(0, 10)} </h3>
              <p>{post.content} </p>
            </div>
          ))

          }
        </div>
      </div>
    </>
  )
}
