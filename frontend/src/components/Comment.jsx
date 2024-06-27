/* eslint-disable react/prop-types */
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { url } from "../../url";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
// import { BiEdit } from "react-icons/bi";

const Comment = ({com}) => {
    const {user}=useContext(UserContext)

    const deleteComment = async(id)=>{
        try{
            await axios.delete(url+"/api/comments/"+id,{withCredentials:true})
            window.location.reload(true)
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-gray-600">@{com.author}</h3>
                            <div className="flex justify-center items-center space-x-4">
                                <p className="text-gray-500 text-sm">{new Date(com.updatedAt).toString().slice(0,15)}</p>
                                <p className="text-gray-500 text-sm">{new Date(com.updatedAt).toString().slice(16,24)}</p>
                                {
                                    user?._id === com?.userId
                                    ?
                                    (
                                        <div className=" flex justify-between items-center space-x-2">
                                            {/* <p><BiEdit /></p> */}
                                            <p className ="cursor-pointer" onClick={()=>deleteComment(com._id)}><MdDelete /></p>
                                        </div>
                                    )
                                    :
                                    ""

                                }
                                
                            </div>
                        </div>
                        <p className="px-4 mt-2">{com.comment}</p>
                    </div>
            
        </div>
    );
};

export default Comment;