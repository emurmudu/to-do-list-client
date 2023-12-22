import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Provider/AuthProvider";


const Register = () => {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { createUser } = useContext(AuthContext);


    const handleRegiseter = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const occupation = e.target.occupation.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;
        console.log(name, email, occupation, photoURL, password);

        if (password.length < 6) {
            setRegisterError('Password length should be 6 or above');
            return;
        }
        else if (!/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/.test(password)) {
            setRegisterError('Please use at least one special character');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Please use at least one upper case character');
            return;
        }

        setRegisterError('');
        setSuccess('');


        try {
            // const result = await createUser(email, password, { name, photoURL });
            const result = await createUser(email, password, name);
            console.log('What is this', result);


            const user = result.user;
            await updateProfile(user, {
                displayName: name,
                photoURL: photoURL,
            });

            // Additional fetch request here

            const userData = { name, email, occupation, password, photoURL };
            fetch('http://localhost:5000/user', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            console.log('What is this', result);
            console.log(result.user);
            toast.success('You have registered successfully', {
                position: toast.POSITION.TOP_RIGHT,
            });

            e.target.reset();
            navigate("/");
        } catch (error) {
            console.error(error);
            setRegisterError(error.message);
        }
    };


    return (
        <div className=" mx-auto">
            <Helmet>
                <title>TaskManager | Register</title>
            </Helmet>

            <h2 className=" text-center text-3xl mt-4 mb-4">Please Register</h2>

            <div className="">
                <form onSubmit={handleRegiseter} className="card-body w-3/4 md:w-2/4 lg:w-2/5 mx-auto dark:text-white shadow-xl border">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="your name" className="input input-bordered dark:bg-zinc-700" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="your email" className="input input-bordered dark:bg-zinc-700" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Occupation</span>
                        </label>
                        <input type="text" name="occupation" placeholder="your occupation" className="input input-bordered dark:bg-zinc-700" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Photo URL</span>
                        </label>
                        <input type="text" name="photoURL" placeholder="your photo url" className="input input-bordered dark:bg-zinc-700" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Password</span>
                        </label>
                        <div className=" relative">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered w-full mx-auto py-2 px-4 dark:bg-zinc-700" required />
                            <span className="absolute top-4 right-6" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                            </span>
                        </div>

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-outline dark:btn-neutral dark:text-white">Register</button>
                        <ToastContainer />
                        {
                            registerError && <p className=" text-red-600 mt-2">{registerError}</p>
                        }
                    </div>
                    <p>Have an account? <NavLink className=" font-bold" to="/login">Login</NavLink></p>
                </form>
            </div>

        </div>
    );
};


export default Register;