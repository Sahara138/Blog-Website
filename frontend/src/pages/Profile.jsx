import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfilePosts from '../components/ProfilePosts';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../url';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
    const param = useParams.id
    const {user,setUser}=useContext(UserContext)
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const [updated,setUpdated]=useState(false)
    const [posts,setPosts]=useState([])


    const fetchProfile= async()=>{
        try{
            const res = await axios.get(url+"/api/users/"+user._id)
            setUsername(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchProfile()
    },[param])

    const handleUserUpdate=async()=>{
        setUpdated(false)
        try{
            const res = await axios.put(url+"/api/users/"+user._id,{username,email,password},{withCredentials:true})
            console.log(res)
            setUpdated(true)
        }
        catch(err){
            console.log(err)
            setUpdated(false)
        }
    }


    const handleUserDelete=async()=>{
        try{
            const res=await axios.delete(url+"/api/users/"+user._id,{withCredentials:true})
            setUser(null)
            navigate("/")
            // console.log(res.data)
        
          }
          catch(err){
            console.log(err)
          }
    }

    


    const fetchUserPosts=async ()=>{
        try{
          const res=await axios.get(url+"/api/posts/user/"+user._id)
        //   console.log(res.data)
          setPosts(res.data)
      
      
        }
        catch(err){
          console.log(err)
        }
      }

      useEffect(()=>{
        fetchUserPosts()
    },[param])


    
    return (
        <div>
            <Navbar />
            <div className='px-8 mt-8 md:px-[200px] flex md:flex-row flex-col-reverse md:items-start'>
                <div className='flex flex-col w-full md:w-[70%] '>
                    <h1 className='text-xl font-bold mb-4'>Your Posts:</h1>
                    {
                        posts?.map((p)=>(
                            <ProfilePosts key={p._id} p={p} />
                        ))
                    }
                </div>


                <div className='md:sticky md:top-16 flex justify-starts md:justify-end items-end w-full md:w-[70%] md:items-end mb-12'>
                    <div className='flex flex-col space-y-4'>
                        <h1 className='text-xl font-bold mb-4 text-start'>Profile</h1>
                        <input onChange={(e)=>setUsername(e.target.value)} value={username} className='outline-none px-4 py-2 text-gray-500' type="text" placeholder='Your username'/>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='outline-none px-4 py-2 text-gray-500' type="text" placeholder='Your email'/>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='outline-none px-4 py-2 text-gray-500' type="text" placeholder='Your password'/>
                        <div className='flex items-center space-x-4 mt-8'>
                            <button onClick={handleUserUpdate} className='text-white hover:text-black bg-black hover:bg-gray-400 font-semibold px-4 py-2'>Update</button>
                            <button onClick={handleUserDelete} className='text-white hover:text-black bg-black hover:bg-gray-400 font-semibold px-4 py-2'>Delete</button>

                        </div>
                        {updated && 
                        <h3 className='text-green-700 text-sm text-center mt-4'>User updated Successfully!</h3>
                        }

                    </div>
                    
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Profile;