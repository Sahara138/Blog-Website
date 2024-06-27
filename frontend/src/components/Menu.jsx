import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { url } from "../../url";
import axios from "axios";
import { Link } from "react-router-dom";


const Menu = () => {
    const {user,setUser} = useContext(UserContext)
    // console.log(user)

    const handleLogout =async()=>{
        try{
            const res = await axios.get(url+"/api/auth/logout",{withCredentials:true})
            console.log(res)
            setUser(null)
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className='bg-black w-[200px] z-10 flex flex-col items-start absolute top-14 right-5 md:right-48 px-6 py-4 space-y-2 rounded-md'>
            {!user && <h3 className='text-white text-sm  hover:text-gray-400 cursor-pointer'><Link to="/login">Login</Link></h3>}
            {!user && <h3 className='text-white text-sm hover:text-gray-400 cursor-pointer'><Link to="/register">Register</Link></h3>}
            {user && <h3 className='text-white text-sm  hover:text-gray-400 cursor-pointer'><Link to={"/profile/"+user._id}>Profile</Link></h3>}
            {user && <h3 className='text-white text-sm hover:text-gray-400 cursor-pointer'><Link to="/write">Write</Link></h3>}
            {user && <h3 className='text-white text-sm  hover:text-gray-400 cursor-pointer'><Link to={"/myblogs/"+user._id}>My Blogs</Link></h3>}
            {user && <h3 onClick={handleLogout} className='text-white text-sm hover:text-gray-400 cursor-pointer'>Logout</h3>}
        </div>
    );
};

export default Menu;