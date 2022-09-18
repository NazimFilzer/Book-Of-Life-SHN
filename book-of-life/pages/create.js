import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import Link from "next/link";
import styles from "../styles/Dashboard.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from 'next/image'
import dynamic from "next/dynamic";
export default dynamic(() => Promise.resolve(CreateProfile), {
  ssr: false
})
export function CreateProfile() {
  const User = supabaseClient.auth.user();
  const router = useRouter();
  if (typeof window != "undefined") {
    const user = supabaseClient.auth.user();
    if (!user) {
      router.push("/");
    }
  }
  async function signout() {
    const { error } = await supabaseClient.auth.signOut()
    router.push('/')
  }

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ content: "" });
  const [post1, setPost1] = useState({ title: "" });
  const { content } = post;
  const { title } = post1;
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabaseClient
      .from("posts")
      .select()
      .eq("userId", User?.id);
    setPosts(data);
  }

  async function createPost() {
    const userId = User?.id;
    await supabaseClient.from("posts").insert([{ title, content, userId }]);
    fetchPosts();

    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>Book Of Life | Create</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={styles.dashboard_container}>
      <div className={styles.dashboard_nav} >
         <div className={styles.dashboard_nav_logo}>
         <Image src="/logo.png" width="150" height="150" />
         </div><br/>
         <Link href='/dashboard'><Button variant="contained" style={{ backgroundColor:"#fff", color:"#000", }} className={styles.dashboard_button}><Image className={styles.dashboard_button_img} src="/profile.png" width="20" height="20" />MY DIARY</Button></Link>
         <Link href='/create'><Button variant="contained" style={{ backgroundColor:"#fff", color:"#000" }} className={styles.dashboard_button}><Image src="/create.png" width="20" height="20" />Create POST</Button></Link>
         <Link href='/dashboard'><Button variant="contained" style={{ backgroundColor:"#fff", color:"#000", }} className={styles.dashboard_button}><Image className={styles.dashboard_button_img} src="/profile.png" width="20" height="20" />{User?.user_metadata.name}</Button></Link>

        <Button variant="contained" style={{ backgroundColor:"#fff" , color:"#000"}} onClick={signout} className={styles.dashboard_button}><Image src="/logout.png" width="20" height="20" />Signout</Button>
      </div>
      <div className={styles.dashboard_content}>
        <div className={styles.dashboard_content_nav}>
          <h2>Create A New Diary</h2>
        </div>
        <div className={styles.posts_container_1}>
        <TextField
          id="outlined-basic"
          required
          label="Title"
          sx={{ width: "100%" }}
          value={title}
          onChange={(e) => {
            setPost1({ ...posts, title: e.target.value });
          }}
        />
   
        <TextField
          id="outlined-basic"
          label="Diary Entry"
          required
          sx={{ width: "100%" }}
          multiline
          minRows={4}
          value={content}
          onChange={(e) => {
            setPost({ ...posts, content: e.target.value });
          }}
        />
     
        <Button
        className={styles.dashboard_button_create}  
          variant="contained"
          onClick={() => {
            if (!title?.trim() || !content?.trim()) {
              alert("Please fill all the fields..");
            } else {
              createPost();
            }
          }}
        >
          ADD DIARY ENTRY
        </Button>
        </div>
      </div>
      </div>
    </>
  );
}
