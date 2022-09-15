import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import styles from './Dashboard.module.css';

export default function Dashboard() {
  async function signout() {
    const { error } = await supabaseClient.auth.signOut()
  }
  const User = supabaseClient.auth.user()
  console.log(User)

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: " ", content: " " })
  const { title, content } = post;
  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data } = await supabaseClient
      .from('posts')
      .select()
    setPosts(data)
    console.log("data:", data)
  }

  async function createPost() {
    await supabaseClient
      .from('posts')
      .insert([
        { title: "", content: "" }
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
          placeholder="Title"
          value={title}
          onChange={e => { setPost({ ...posts, title: e.target.value }) }}
        />
        <input
          placeholder="Content"
          value={content}
          onChange={e => { setPost({ ...posts, content: e.target.value }) }}
        />

        <Button variant="contained" onClick={createPost}>Create POST</Button>
        {
          posts.map(post => (
            <div key={post.id}>
              <h3>{post.title} </h3>
              <p>{post.content} </p>
            </div>
          ))
        }
      </div>
    </>
  )
}
