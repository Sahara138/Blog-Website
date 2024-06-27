import { ImCross } from "react-icons/im";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { url } from "../../url";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const {user}= useContext(UserContext)
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [file,setFile] = useState(null)
    const [category,setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

    const addCategory = ()=>{
        let updatedCates = [...categories]
        updatedCates.push(category)
        setCategory("")
        setCategories(updatedCates)
    }

    const deleteCategory = (i)=>{
        let updatedCates = [...categories]
        updatedCates.splice(i)
        setCategories(updatedCates)
    }

    const handleCreate = async(e)=>{
        e.preventDefault()
        const post ={
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: categories
        }
        if(file){
            const data = new FormData()
            const filename = Date.now()+ file.name
            data.append("img",filename)
            data.append("file",file)
            post.image = filename

            // img upload
            try{
                const imgUpload = await axios.post(url+"/api/upload",data)
                console.log(imgUpload.data)
            }
            catch(err){
                console.log(err)
            }
        }
        console.log(post)

        // Post upload
        try{
            const res = await axios.post(url+"/api/posts/create",post,{withCredentials:true})
            // console.log(res.data)
            navigate("/posts/post/"+res.data._id)
        }
        catch(err){
            console.log(err)
        }
        
    }

    return (
        <div>
            <Navbar />
            <div className='mt-8 px-6 md:px-[200px]'>
                <h1 className='font-bold text-xl md:text-2xl mt-8'>Create a post</h1>
                <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                    <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter post title ' className='px-4 py-2 outline-none'/>
                    <input onChange={(e)=>setFile(e.target.files[0])} type="file" className='px-4'/>
                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4 md:space-x-8'>
                            <input value={category} onChange={(e)=>setCategory(e.target.value)} type="text" placeholder='Enter Post Category' className='px-4 py-2 outline-none'/>
                            <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
                        </div>
                        <div className="flex mt-3 px-4">
                            {
                                categories.map((cat,i) =>{
                                    return(
                                        <div key={i} className='flex items-center justify-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md mt-8'>
                                            <p>{cat}</p>
                                            <p onClick={()=>deleteCategory(i)} className='bg-black text-white rounded-full text-sm cursor-pointer p-1'><ImCross /></p>
                                        </div>
                                    )
                                })
                            }
                            
                            
                        </div>
                        
                    </div>
                    <textarea onChange={(e)=>setDesc(e.target.value)} cols="30" rows="15" className="px-4 py-2 outline-none" placeholder="Enter post description"/>
                    <button onClick={handleCreate} className="bg-black text-white font-semibold px-4 py-2 md:text-xl text-lg w-full md:w-[20%] mx-auto">Create</button>
                </form>
            </div>
            <Footer />
            
        </div>
    );
};

export default CreatePost;