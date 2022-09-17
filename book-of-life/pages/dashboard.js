import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
import { red} from '@mui/material/styles'
import { borderTopColor } from "@mui/system";

export default dynamic(() => Promise.resolve(Dashboard), {
  ssr: false
})
function Dashboard() {
  const router = useRouter();
  if (typeof window != 'undefined') {
    const user = supabaseClient.auth.user()
    if (!user) {
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
    wordBreak: "break-all",
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
      <div className={styles.dashboard_container}>

      <div className={styles.dashboard_nav} >
         <div className={style.dashboard_nav_logo}>
         <Image src="/logo.png" width="150" height="150" />
         </div>
        <Button variant="contained" style={{ backgroundColor:"#fff", color:"#000" }} className={styles.dashboard_button}><Image className={styles.dashboard_button_img} src="/profile.png" width="20" height="20" />{User?.user_metadata.name}</Button>
        <Button variant="contained" style={{ backgroundColor:"#fff" , color:"#000"}} onClick={signout} className={styles.dashboard_button}><Image src="/logout.png" width="20" height="20" />Signout</Button>
        <Link href='/create'><Button variant="contained" style={{ backgroundColor:"#fff", color:"#000" }} className={styles.dashboard_button}><Image src="/create.png" width="20" height="20" />Create POST</Button></Link>

      </div>
      <div className={styles.dashboard_content}>
        <div className={styles.dashboard_content_nav}>
          <h2>Dashboard</h2>
        </div>
      <div className={styles.posts_container}>

          {posts.map(post => (
            <div key={post.id} style={{ backgroundColor: "#fff", width: "300px", padding: "20px", borderRadius: "5px", borderTop: "10px solid #fff" , borderColor:getRandomColor(), boxShadow: "5px 10px #888888 .6" }}>
              <h3 style={{ cursor: "pointer" }} onClick={() => { handleOpen(); setmodalData(post) }} ><Image src="/cala.png" width="30" height="20" />{post.created_at.substring(0, 10)} </h3>
              <p style={{ cursor: "pointer" }} onClick={() => { handleOpen(); setmodalData(post) }}>{post.content.substring(0, 30) + "..."} </p>
              <Button variant="contained" style={{ backgroundColor:"#8D0000" }} onClick={() => { deletePost(post.id) }} props={post} >Delete</Button>
            </div>



          ))}

        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalData ? modalData.title : ""}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h4">
            {modalData ? modalData.created_at.substring(0, 10) : ""}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalData.content}
          </Typography>
        </Box>
      </Modal>

      </div>
      
      
        
   
      </div>
      
    </>
  )
}
