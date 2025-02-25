import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
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
  const [post, setPost] = useState({ title:" ",content: " " })
  const { title,content } = post;
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
    margin: '2px',
    height:'75%',
    border: '0px solid #000',
    wordBreak: "break-all",
    left: '50%',
  overflowY:"scroll",
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    position:'absolute',
    
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
        <title>Book Of Life</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.dashboard_container}>

      <div className={styles.dashboard_nav} >
         <div className={styles.dashboard_nav_logo}>
         <Image src="/logo.png" width="150" height="150" />
         </div><br/>
         
          <Link href='/dashboard'><Button variant="contained" style={{ backgroundColor:"#fff", color:"#000", textAlign:"right" }} className={styles.dashboard_button}><Image className={styles.dashboard_button_img} src="/book.png" width="20" height="20" />MY DIARY</Button></Link>
         <Link href='/create'><Button variant="contained" style={{ backgroundColor:"#fff", color:"#000" }} className={styles.dashboard_button}><Image src="/create.png" width="20" height="20" />Create POST</Button></Link>
         <Link href='/dashboard'><Button variant="contained" style={{ backgroundColor:"#fff", color:"#000", }} className={styles.dashboard_button}><Image className={styles.dashboard_button_img} src="/profile.png" width="20" height="20" />{User?.user_metadata.name}</Button></Link>

        <Button variant="contained" style={{ backgroundColor:"#fff" , color:"#000"}} onClick={signout} className={styles.dashboard_button}><Image src="/logout.png" width="20" height="20" />Signout</Button>
        

      </div>
      <div className={styles.dashboard_content}>
      <div className={styles.dashboard_content_nav}>
          <h2>My Diary</h2>
        </div>
        
      <div className={styles.posts_container}>
    

          {posts.map(post => (
           <div key={post.id} style={{ backgroundColor: "#fff", width: "300px", padding: "20px", borderRadius: "5px", borderTop: "10px solid #fff" , borderColor:getRandomColor(), boxShadow: "5px 10px #888888 .6" }}>
           <h3 style={{ cursor: "pointer" }} onClick={() => { handleOpen(); setmodalData(post) }} ><Image src="/book1.png" style={{ paddingTop:"20px" }} width="30" height="20" />{post.title} </h3>
           <h5 style={{ cursor: "pointer" , fontSize:"14px"}} onClick={() => { handleOpen(); setmodalData(post) }} ><Image src="/cala.png" width="22" height="15" />{post.created_at.substring(0, 10)} </h5>
              <p style={{ cursor: "pointer" }} onClick={() => { handleOpen(); setmodalData(post) }}>{post.content.substring(0, 30) + "..."} </p>
              <Button variant="contained" style={{ backgroundColor:"rgb(248 230 254)" ,borderRadius:"12%",marginRight:"10px", cursor: "pointer" , fontSize:"11px",boxShadow:"none",color:"#000" }} onClick={() => { handleOpen(); setmodalData(post) }} >Read more</Button>
              <Button variant="contained" style={{ backgroundColor:"rgb(255 227 227)",borderRadius:"12%",paddingLeft:"0px",paddingRight:"0px" ,boxShadow:"none"}} onClick={() => { deletePost(post.id) }} props={post} ><Image src="/delete.png" width="18" height="18" /></Button>
            </div>



          ))}

        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
        <div className={styles.posts_container_diary}>
        </div>
        <Button variant="contained" style={{ alignItems:"flex-end",backgroundColor:"#b16c8e" ,paddingRight:"5px",paddingLeft:"5px"}} onClick={() => { setOpen(false)}} props={post} ><Image src="/close.png" width="22" height="22" /></Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h2>{modalData ? modalData.title : ""}</h2>
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h4">
          <h3 style={{ fontSize:"17px"}} ><Image src="/cala.png" width="25" height="16" />{modalData ? modalData.created_at.substring(0, 10) : ""}</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>{modalData.content}</p>
          </Typography>
        </Box>

        
      </Modal>

      </div>
      
      
        
   
      </div>
      
    </>
  )
}
