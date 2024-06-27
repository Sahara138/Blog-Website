

const Footer = () => {
    return (
        <>
        <div className="mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col items-start md:justify-between text-sm md:text-md py-8 space-y-4 md:space-y-0 ">
            <div className="flex flex-col text-white">
                <p>Featured Blogs</p>
                <p>Most Viewed</p>
                <p>Readers Choice</p>
            </div>

            <div className="flex flex-col text-white">
                <p>Support</p>
                <p>Forum</p>
                <p>Recent Posts</p>
            </div>

            <div className="flex flex-col text-white">
                <p>Privacy Policy</p>
                <p>About Us</p>
                <p>Terms & Conditions</p>
                <p>Terms of Services</p>
            </div>
        </div>
        <p className="py-2 pb-2 text-center text-white bg-black">All rights reserved @Blog Market 2023</p>
        </>
        
    );
};

export default Footer;