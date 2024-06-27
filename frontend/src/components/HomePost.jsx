/* eslint-disable react/prop-types */
import {Image} from '../../url';
const HomePost = ({post}) => {

    return (
        <div className="w-full flex mt-8 space-x-4">

            {/* left */}
            <div className="w-[35%] flex items-center justify-center">
                <img src={Image+post.image} alt="" className="w-full h-full object-cover" />
            </div>

            {/* right */}
            <div className="w-[65%] flex flex-col">
                <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
                    {post.title}
                </h1>
                <div className="flex items-center justify-between mb-2 text-sm font-semibold text-gray-500 space-x-4 md:mb-4">
                    <p>{post.username}</p>
                    <div className="flex space-x-2">
                        <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
                        <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
                    </div>

                </div>
                <p className="text-sm md:text-lg">{post.desc.slice(0,250)+"...Read more"}</p>
            </div>

            
        </div>
    );
};

export default HomePost;