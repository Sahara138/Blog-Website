import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { url } from "../../url";
import { UserContext } from "../../context/UserContext";



const Login = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)
    const {setUser} =useContext(UserContext)


    const handleLogin = async() =>{
        try{

            const res = await axios.post(url + "/api/auth/login" ,{email,password},{withCredentials:true})
            // console.log(res)
            setUser(res.data)
            // setEmail(res.data.email)
            // setPassword(res.data.password)
            setError(false)
            navigate("/")


            // fetch("http://localhost:5000/api/auth/login",
            //   {
            //       method:'POST',
            //       headers: {
            //           'Content-type' : 'application/json',
            //       },
            //       body: JSON.stringify({email,password}),
            //   }
            //   )
            //   .then(res=>res.json())
            //   .then(data=> { 
                        // setUser(res.data)
                        // setEmail(email)
                        // setPassword(password)
                        // setError(false)
                        // navigate("/")
            //       // }
            //       console.log(data)
            //   })
        }
        catch(err){
            setError(true)
            console.log(err)
        }
    }
    return (
        <>

        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
           <h1 className="text-lg md:text-xl font-extrabold"><Link to='/' >Blog Market</Link></h1>
           <h3><Link to="/register">Register</Link></h3>
        </div>
        <div className="flex items-center  justify-center w-full h-[70vh]">
            <div className="flex flex-col items-center justify-center w-[80%] md:w-[25%] space-y-4">
                <h1 className="text-xl font-bold text-left">Log into your account</h1>
                <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-none" type="text" placeholder="Enter your email" />
                <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-none" type="text" placeholder="Enter your password" />
                <button onClick={handleLogin} className="w-full px-4 py-3 text-lg text-white font-bold bg-black rounded-lg hover:bg-gray-500 hover:text-black">Log in</button>
                {error && <h3 className="text-red-500">Something went wrong</h3>}
                <div className="flex items-center justify-center space-x-2">
                    <p>New Here?</p>
                    <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
                </div>
            </div>
            
        </div>
        <Footer />
        </>

    );
};

export default Login;