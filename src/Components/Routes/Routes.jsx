import { createBrowserRouter } from "react-router-dom";
import Home from "../HomePage/Home";
import Login from "../Users/Login";
import MainLayout from "../Layout/MainLayout";
import ErrorsPage from "../Pages/ErrorsPage";


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
        ]
    },
]);

export default router;