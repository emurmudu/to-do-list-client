import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import axios from "axios";
import auth from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider()
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);

    // const createUser = (email, password) => {
    //     setLoading(true);
    //     return createUserWithEmailAndPassword(auth, email, password)
    // }



    const createUser = (email, password, displayName, photoURL) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;

                return updateProfile(user, {
                    displayName: displayName,
                    photoURL: photoURL,
                }).then(() => {
                    setLoggedInUserEmail(result.user.email);
                    setLoading(false);
                    return result;
                }).catch((error) => {
                    console.error("Error updating user profile:", error);
                    setLoading(false);
                    throw error;
                });
            })
            .catch((error) => {
                console.error("Error creating new user:", error);
                setLoading(false);
                throw error;
            });
    };






    // const createUser = async (email, password, additionalData) => {
    //     // eslint-disable-next-line no-useless-catch
    //     try {
    //         const result = await createUserWithEmailAndPassword(auth, email, password);
    //         const user = result.user;

    //         // Additional code to store user data in MongoDB
    //         await fetch('http://localhost:5000/register', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 password,
    //                 name: additionalData.name,
    //                 photoURL: additionalData.photoURL,
    //             }),
    //         });

    //         return user;
    //     } catch (error) {
    //         throw error;
    //     }
    // };


    const logInWithUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setLoggedInUserEmail(result.user.email);
                return result;
            });
    }


    const logInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                setLoggedInUserEmail(result.user.email);
                return result;
            });
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            console.log('logged in users', currentUser);
            setLoading(false);
            //if user exist
            // if (currentUser) {

            //     axios.post('http://localhost:5000/jwt', loggedUser, { withCredentials: true })
            //         .then(res => {
            //             console.log('token response', res.data);
            //         })
            //         .catch(error => {
            //             console.log('Axios Error', error);
            //         });
            // }
            // else {
            //     axios.post('http://localhost:5000/logout', loggedUser, {
            //         withCredentials: true
            //     })
            //         .then(res => {
            //             console.log(res.data)
            //         })
            //         .catch(error => {
            //             console.log('Axios Error', error);
            //         });
            // }
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = { user, createUser, logInWithUser, logInWithGoogle, loading, logOut, loggedInUserEmail }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;