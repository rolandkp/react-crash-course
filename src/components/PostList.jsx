import { useState ,useEffect} from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostList.module.css';


function PostList({ isPosting, onStopPosting }) {
  const [post, setPost]=useState([])
  const [isFetching, setIsFetching]=useState(false)
  function addPostHandler(postData){
    fetch('http://localhost:8080/posts',{
      method: 'Post',
      body:JSON.stringify(postData),
      headers:{
        'Content-type':'application/json'
      }
    })
            // setPost([postData,...post])
            // setPost((existingPosts)=>[postData,...existingPosts])
  }
  useEffect(()=>{
    // fetch('http:/localhost:8080/posts',{
    //   method:"Get",
    //   headers:{
    //     'Content-type':'application/json'
    //   }
    // }).then(response=>response.json()).then(data=>{
    //   setPost(data.posts)
    // })
    
    async function fetchPosts(){
      setIsFetching(true)
      const response= await fetch('http://localhost:8080/posts');
      const reponsedata= await response.json();
      setPost(reponsedata.posts);
      setIsFetching(false)
    }
    fetchPosts()
  },[]);
  console.log('post:',post)

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}


      {!isFetching && post.length>0 &&
      <ul className={classes.posts}>
        {post.map((p)=><Post author={p.author} body={p.body} />)}
        {/* <Post author={"Manuel"} body="Check out the full course!" /> */}
        {/* <li>{post}</li> */}
      </ul>
}   {!isFetching && post.length==0 &&
      <div style={{textAlign:'center'}}>
        <p>No Record Found</p>
      </div>
    } 
    {isFetching && 
      <div  style={{textAlign:'center'}}>
        <p>loading.......</p>
      </div>
    }
    </>
  );
}

export default PostList;
