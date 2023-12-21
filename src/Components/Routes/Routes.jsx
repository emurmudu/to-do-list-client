import { createBrowserRouter } from "react-router-dom";
import Home from "../HomePage/Home";
import Login from "../Users/Login";
import MainLayout from "../Layout/MainLayout";
import ErrorsPage from "../Pages/ErrorsPage";
import Dashboard from "../Dashboard/Dashboard";
import Register from "../Users/Register";
import PrivateRoutes from "./PrivateRoutes";
import CreateTask from "../Dashboard/CreateTask";
import PreviousMap from "postcss/lib/previous-map";
import AllList from "../Dashboard/AllList";
import PreviousTask from "../Dashboard/PreviousTask";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorsPage></ErrorsPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        errorElement: <ErrorsPage></ErrorsPage>,
        children: [
            {
                path: 'createTask',
                element: <CreateTask></CreateTask>
            },
            {
                path: 'previousTask',
                element: <PreviousTask></PreviousTask>
            },
            {
                path: 'allList',
                element: <AllList></AllList>
            },
        ]
    }
]);

export default router;