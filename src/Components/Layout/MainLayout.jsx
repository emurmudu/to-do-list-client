import { Outlet } from "react-router-dom";
import Navbar from "../HomePage/Navbar";
import Footer from "../Pages/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className=" min-h-screen">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;