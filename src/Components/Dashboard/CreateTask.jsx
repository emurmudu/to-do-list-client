import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
// import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
// import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const CreateTask = () => {

    const navigate = useNavigate();
    const [addError, setAddError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useContext(AuthContext);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(res => res.json())
            .then(data => setTasks(data));
    }, [])




    const handleCreateTask = async (e) => {
        e.preventDefault();
        const task_name = e.target.task_name.value;
        const name = user?.displayName;
        const email = user?.email;
        const description = e.target.description.value;
        console.log(task_name, description);

        // if (password.length < 0) {
        //     setRegisterError('Password length should be 6 or above');
        //     return;
        // }



        setAddError('');
        setSuccess('');


        try {
            // const result = await createUser(email, password, { name, photoURL });
            // const result = await createUser(email, password, name);
            // console.log('What is this', result);


            // const user = result.user;
            // await updateProfile(user, {
            //     displayName: name,
            //     photoURL: photoURL,
            // });

            // Additional fetch request here

            const userData = { name, task_name, description, email };
            fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            // console.log('What is this', result);
            // console.log(result.user);
            toast.success('Task created successfully', {
                position: toast.POSITION.TOP_RIGHT,
            });

            e.target.reset();
            // navigate("/");
        } catch (error) {
            console.error(error);
            setAddError(error.message);
        }
    };




    return (
        <div className="mx-auto">
            <Helmet>
                <title>Task Manager | Crate Task</title>
            </Helmet>
            <h2 className=" text-center text-3xl mt-4 mb-4">Create Task</h2>

            <div className="">
                <form onSubmit={handleCreateTask} className="card-body bg-green-200 w-3/4 md:w-2/4 lg:w-2/5 mx-auto dark:text-white shadow-xl border">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Task Name</span>
                        </label>
                        <input type="text" name="task_name" placeholder="task name" className="input input-bordered dark:bg-zinc-700" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Description</span>
                        </label>
                        {/* <input type="text" name="description" placeholder="Task description" className="input input-bordered dark:bg-zinc-700" required /> */}
                        <textarea type="text" name="description" placeholder="Task description" id="" cols="30" rows="10" className="input input-bordered dark:bg-zinc-700" required></textarea>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-outline dark:btn-neutral dark:text-white">Add</button>
                        <ToastContainer />
                        {
                            setAddError && <p className=" text-red-600 mt-2">{setAddError}</p>
                        }
                    </div>

                </form>
            </div>


        </div>
    );
};

export default CreateTask;