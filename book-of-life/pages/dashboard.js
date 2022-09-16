import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

export default dynamic(() => Promise.resolve(Dashboard), {
  ssr: false
})
function Dashboard() {
  const router=useRouter();
  if(typeof window != 'undefined') {
    const user = supabaseClient.auth.user()
    if(!user){
      router.push('/')
    }
  }
    

const [open, setOpen] = useState(false);
const [modalData, setmodalData] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      .select().eq('userId', User?.id)
    setPosts(data)
  }
  async function deletePost(id) {
    const { data } = await supabaseClient
      .from('posts')
      .delete()
      .eq("id", id);
      refreshPage();
  }
  function refreshPage() {
    window.location.reload(false);
  }
  const style = {
    position: 'absolute',
    top: '50%',
    wordBreak:"break-all",
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
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
    <Head>
        <title>Book Of Life | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.dashboard_container}>Dashboard
      <Button variant="contained" >{User?.user_metadata.name}</Button>
      <Button variant="contained" onClick={signout}>Signout</Button>
        <Link href='/create'><Button variant="contained">Create POST</Button></Link>
        <div className={styles.posts_container}>
          {posts.map(post => (
            <div key={post.id} style={{ backgroundColor: getRandomColor(), width: "400px", padding: "10px", borderRadius: "5px", border: "1px solid", boxShadow: "5px 10px #888888" }}>
              <h3 style={{cursor:"pointer"}} onClick={() => {handleOpen();setmodalData(post) }} >{post.created_at.substring(0, 10)} </h3>
              <p   style={{cursor:"pointer"}} onClick={() => { handleOpen();setmodalData(post) }}>{post.content.substring(0, 50)} </p>
              <Button variant="contained" onClick={() => { deletePost(post.id) }} props={post} >Delete</Button>
            </div>
           
          ))}
        
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalData? modalData.created_at.substring(0, 10):""}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modalData.content}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}
