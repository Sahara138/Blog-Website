import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { url } from "../../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Loader from "../components/Loader";
import HomePost from "../components/HomePost";


const MyBlogs = () => {
    const {search} = useLocation()
    console.log(search)
    const {user}=useContext(UserContext)
    console.log(user)


    const [posts,setPosts]= useState([])
    const [noResults,setNoResults]= useState(false)
    const [loader,setLoader] = useState(false)
    

    
    const fetchPosts = async()=>{
        setLoader(true)
        try{
            const res=await axios.get(url+"/api/posts/user/"+user._id)
            // console.log(res)
            setPosts(res.data)
            if(res.data.length===0){
                setNoResults(true)
            }else{
                setNoResults(false)
            }
            setLoader(false)
        }
        catch(err){
            console.log(err)
            setLoader(true)
        }
    }

    useEffect(()=>{
        fetchPosts()
    
      },[search])

    return (
        <div>
            <Navbar />
            <div className="px-8 md:px-[200px] min-h-[80vh]">
                {
                    loader
                    ?
                    <div className="flex justify-center items-center h-[40vh]"><Loader /></div>
                    :
                    (!noResults?
                    posts?.map((post)=>(
                        <>
                        <Link to={user?`/posts/post/${post._id}`:"/login"}>
                        <HomePost key={post._id} post={post}/>
                        </Link>
                        </>

                            
                        
                    )):
                    <h3 className="text-center font-bold mt-16">No posts Available</h3>)
                }

            </div>
            <Footer />
        </div>
    );
};

export default MyBlogs;