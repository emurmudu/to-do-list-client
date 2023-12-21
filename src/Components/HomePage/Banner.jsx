import { NavLink } from "react-router-dom";

const Banner = () => {
    return (
        <div className="hero h-[100vh] mb-10" style={{ backgroundImage: 'url(https://i.ibb.co/RpprHKC/to-do-list2.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-xl md:text-3xl lg:text-5xl font-bold">Manage Your Task</h1>
                    {/* <p className="mb-5">Update yourself with the flow of Innovations </p> */}
                    <NavLink to='/dashboard/allList'><button className="btn btn-primary">Let's Explore</button></NavLink>
                </div>
            </div>
        </div>
    );
};

export default Banner;