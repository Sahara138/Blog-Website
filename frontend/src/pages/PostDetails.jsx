import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { url,Image } from "../../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
    const postId = useParams().id
    // console.log(postId)
    const {user}= useContext(UserContext)
    const [post,setPost] = useState({})
    const [comments,setComments] = useState([])
    const [comment,setComment] = useState("")
    const [loader,setLoader] = useState(false)
    const navigate = useNavigate()
    console.log(user)


    const fetchPosts = async()=>{
        setLoader(true)
        try{
            const res = await axios.get(url+"/api/posts/"+postId)
            // console.log(res.data)
            setPost(res.data)
            setLoader(false)
        }
        catch(err){
            console.log(err)
            setLoader(true)
        }
    }



    


    useEffect(()=>{
        fetchPosts()
    },[postId])


    

    const fetchPostComments = async()=>{
        try{
            const res = await axios.get(url+"/api/comments/post/"+postId)
            setComments(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchPostComments()
    
    },[postId])

   
    const postComment=async(e)=>{
        e.preventDefault()
        
        try{
          const res= await axios.post(url+"/api/comments/create",
          {comment:comment,author:user.username,postId:postId, userId:user._id},
          {withCredentials:true})
          
        //   fetchPostComments()
        //   setComment("")

          window.location.reload(true)
    
        }
        catch(err){
             console.log(err)
        }
        // console.log(comment)
    
      }
      


    


    const handleDeletePost = async()=>{
        try{

            const res=await axios.delete(url+"/api/posts/"+postId,{withCredentials:true})
            console.log(res.data)
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }

    
    
    

    return (
        <div>
            <Navbar />
            {loader?
            <div className="flex justify-center items-center w-full h-[80vh]"><Loader /></div>
            :
            (<div className="mt-8 px-8 md:px-[200px] ">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl text-black font-bold md:text-3xl">{post.title}</h1>
                    {
                        user?._id == post.userId
                        &&
                        (
                            <div className=" flex justify-between items-center space-x-2">
                                
                                
                                <p onClick={()=>navigate("/edit/"+postId)} className="cursor-pointer"><BiEdit /></p>
                                <p onClick={handleDeletePost} className="cursor-pointer"><MdDelete /></p>
                            </div>
                        )


                    }
                    
                </div>
                <div className="flex justify-between items-center mt-2 md:mt-4">
                    <p>@{post.username}</p>
                    <div className="flex space-x-2">
                        <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
                        <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
                    </div>
                </div>
                <img className="w-full mx-auto mt-8" src={Image + post.image} alt="" />
                <p className="mx-auto mt-8">{post.desc}</p>
                <div className="flex items-center font-semibold mt-8 space-x-4">
                    <p>Categories:</p>
                    <div className="flex justify-center items-center space-x-3">
                        {
                            post.categories?.map((cat,i)=>(
                                <div key={i} className="px-3 py-1 rounded-lg  bg-gray-300">{cat}</div>
                            ))
                        }
                        
                        
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>


                    {/* comments */}

                    {
                        comments?.map((com)=>(
                            <Comment key={com._id} com={com} post={post}/>
                        ))
                    
                    }

                    

                    <div  className="w-full flex flex-col mt-4 md:flex-row">
                        <input onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Write a Comment" className="md:w-[80%] mt-4 px-4 outline-none md:mt-0" />
                        <button onClick={postComment} className="bg-black text-white text-sm px-4 py-2 mt-4 md:mt-0 md:w-[20%] ">Add Comment</button>
                    </div>
                </div>
            </div>)
            }
            <Footer />          
        </div>
    );
};

export default PostDetails;