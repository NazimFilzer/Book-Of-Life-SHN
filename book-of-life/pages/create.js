import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import Link from "next/link";
import styles from "../styles/Dashboard.module.css";
import { useRouter } from "next/router";
import Head from "next/head";

export default function CreateProfile() {
  const User = supabaseClient.auth.user();
  const router = useRouter();
  if (typeof window != "undefined") {
    const user = supabaseClient.auth.user();
    if (!user) {
      router.push("/");
    }
  }

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ content: " " });
  const [post1, setPost1] = useState({ title: " " });
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
        Create a new Post
        <TextField
          id="outlined-basic"
          required
          label="Title"
          sx={{ width: "60%" }}
          value={title}
          onChange={(e) => {
            setPost1({ ...posts, title: e.target.value });
          }}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Diary Entry"
          required
          sx={{ width: "60%" }}
          multiline
          minRows={4}
          value={content}
          onChange={(e) => {
            setPost({ ...posts, content: e.target.value });
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (!title || !content) {
              alert("Please fill all the fields..");
            } else {
              createPost();
            }
          }}
        >
          ADD DIARY ENTRY
        </Button>
      </div>
    </>
  );
}
