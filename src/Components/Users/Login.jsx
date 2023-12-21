import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
    const navigate = useNavigate();
    const { logInWithUser, logInWithGoogle } = useContext(AuthContext);
    const [userError, setUserError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogIn = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setUserError('');

        try {
            const result = await logInWithUser(email, password);
            console.log(result.user);

            // fetch data here

            toast('Login Successful!');
            e.target.reset();
            navigate("/");
        } catch (error) {
            console.error(error);
            setUserError(error.message);
        }
    };

    const handleGoogleLogIn = async () => {
        try {
            const result = await logInWithGoogle();
            console.log(result.user);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mx-auto">
            <Helmet>
                <title>TaskManager | Login</title>
            </Helmet>
            <h2 className="text-center text-xl md:text-2xl lg:text-3xl mt-4 mb-4">Please Login</h2>

            <div className="">
                <form onSubmit={handleLogIn} className="card-body w-3/4 md:w-2/4 lg:w-2/5 mx-auto dark:text-white border shadow-xl">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="your email" className="input input-bordered dark:bg-zinc-700" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                className="input input-bordered w-full mx-auto py-2 px-4 dark:bg-zinc-700"
                                required
                            />
                            <span className="absolute top-4 right-6" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-outline dark:btn-neutral dark:text-white">Login</button>
                        <ToastContainer />
                        {userError && <p className="text-red-600 mt-2">{userError}</p>}
                    </div>
                    <p>Not have an account? <NavLink className="font-bold" to="/register">Register</NavLink></p>
                    <p>Login with <button onClick={handleGoogleLogIn} className="font-bold">Google</button></p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
