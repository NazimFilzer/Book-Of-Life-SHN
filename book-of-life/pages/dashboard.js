import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link'
import { useRouter } from "next/router";

export default function Dashboard() {

  const router = useRouter();
  async function signout() {
    const { error } = await supabaseClient.auth.signOut()
    router.push('/')
  }

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

  async function deletePost(id) {
    const { data } = await supabaseClient
      .from('posts')
      .delete()
      .eq("id", id);
  }

  function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
  const User = supabaseClient.auth.user()
  return (
    <>
      <div className={styles.dashboard_container}>
        Dashboard
        {/* <Button variant="contained">{User.user_metadata.full_name}</Button> */}
        <Button variant="contained" onClick={signout}>Signout</Button>
        <Link href='/create'><Button variant="contained">Create POST</Button></Link>
        <div className={styles.posts_container}>
          {posts.map(post => (
            <div key={post.id} style={{ backgroundColor: getRandomColor(), width: "400px", padding: "10px", borderRadius: "5px", border: "1px solid", boxShadow: "5px 10px #888888" }}>
              <h3>{post.created_at.substring(0, 10)} </h3>
              <p>{post.content} </p>
              <Button variant="contained" onClick={() => { deletePost(post.id) }} props={post} >Delete</Button>
            </div>
          ))

          }
        </div>
      </div>
    </>
  )
}
