import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
    const {user} = useContext(UserContext)
    // console.log(user)

    const navigate = useNavigate()
    const [prompt,setPrompt] = useState("")
    const [menu,setMenu] = useState(false)
    // console.log(prompt)
    const path = useLocation().pathname
    console.log(path)

    const showMenu =()=>{
        setMenu(!menu)
    }
    
    return (
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
           <h1 className="text-lg md:text-xl font-extrabold"><Link to='/' >Blog Market</Link></h1>
           {path === "/" && 
           (<div className="flex items-center justify-center ">
            <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><MdOutlineSearch /></p>
            <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none px-3" type="text" placeholder="Search a post" />
            </div>) 
            }
           <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
            {
                user
                ?
                <h3><Link to="/write">Write</Link></h3> 
                :
                <h3><Link to="/login">Login</Link></h3>
            }
            {
                user
                ?
                <h3>
                <p onClick={showMenu} className="cursor-pointer relative"><FaBars/></p>
                    {
                        menu && <Menu />
                    }
                </h3>
                :
                <h3><Link to="/register">Register</Link></h3>
            }
            
           </div>
           <div onClick={showMenu} className="md:hidden">
                <p className="cursor-pointer relative"><FaBars /></p>
                {
                menu && <Menu />
                }
           </div>
        </div>
    );
};

export default Navbar;