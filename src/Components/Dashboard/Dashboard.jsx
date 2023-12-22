import { FaAd, FaBookOpen, FaBox, FaBoxOpen, FaBoxes, FaChartBar, FaEdit, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUserSecret, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { FaBoxesPacking, FaBoxesStacked, FaDollarSign } from "react-icons/fa6";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { IoMenu } from "react-icons/io5";
import { Helmet } from "react-helmet";



const Dashboard = () => {

    const { user, logOut } = useContext(AuthContext);
    const [profileDropdown, setProfileDropdown] = useState(false);

    const handleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown);
    };

    const handleLogOut = () => {
        logOut()
            .then(() => toast('You are logged out'))
            .catch(error => {
                console.error(error);
                toast.error('Error during logout');
            });
    }



    const profileLinks = (
        <>
            <li><NavLink to='/dashboard/createTask'>Create Task</NavLink></li>
            <li><NavLink to='/dashboard/previousTask'>Previous Task</NavLink></li>
            <li><NavLink to='/dashboard/allList'>All List</NavLink></li>
            <li onClick={handleLogOut}><NavLink to='/'>
                {/* <button onClick={handleLogOut} className="btn btn-sm font-bold dark:text-white dark:bg-zinc-700"> */}
                Logout
                {/* </button> */}
            </NavLink></li>
        </>
    );



    return (
        <div style={{ backgroundImage: 'url(https://i.ibb.co/RpprHKC/to-do-list2.jpg)', backgroundSize: 'cover' }} className=" lg:flex">
            <Helmet>
                <title>TaskManager | Dashboard</title>
            </Helmet>

            {/* Dashboard sidebar  */}
            <div className=" lg:w-64 bg-opacity-70 bg-red-200">
                <ul className=" menu">
                    {/* <div className="navbar-end"> */}
                    {user ? (
                        <>


                            <div className=" flex justify-evenly items-center">
                                {/* <div>
                                        <span className="hidden lg:block font-bold p-2">{user.displayName}</span>
                                    </div> */}
                                {/* <div className="flex items-center gap-1"> */}


                                <div className=" flex justify-between items-center">
                                    <div className="items-center gap-1">
                                        <img
                                            // onClick={handleProfileDropdown}
                                            className="md:block btn btn-ghost btn-circle avatar"
                                            src={user.photoURL || 'https://i.ibb.co/FH5XVy5/images.jpg'}
                                            alt="Profile"
                                        />
                                    </div>
                                    <div>
                                        <span className="hidden lg:block font-bold p-2">{user.displayName}</span>
                                    </div>
                                </div>
                                <div>
                                    <IoMenu className=" text-2xl cursor-pointer" onClick={handleProfileDropdown} />
                                    {profileDropdown && (
                                        // <ul tabIndex={0} className="absolute z-10 right-12 xl:right-36 md:right-12 lg:right-14 mt-40 menu menu-sm dropdown-content p-2 shadow bg-base-100 rounded ">
                                        <ul tabIndex={0} className="absolute z-10 menu menu-sm dropdown-content p-2 shadow bg-base-100 rounded ">
                                            {profileLinks}
                                        </ul>
                                    )}

                                </div>

                            </div>
                        </>
                    ) : (
                        <NavLink to="/login" className="font-bold">
                            <span>Login</span>
                        </NavLink>
                    )}
                    {/* </div> */}


                    {/* Shared nav link  */}
                    <div className=" divider"></div>

                    <li> <NavLink to='/'>
                        <FaHome></FaHome>
                        Browser Home</NavLink></li>
                </ul>
            </div>
            {/* // Dashboard content  */}
            <div className=" h-[100vh] bg-red-100 bg-opacity-70 flex-1 p-6 ">
                <h1 className=" bg-red-200 py-4 mb-6 bg-opacity-70 text-3xl font-bold">Activity of {user.displayName || 'user'}</h1>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;