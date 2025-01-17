import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import {auth } from "../firebase/firebase.config"

const AuthContext = createContext();
export const useAuth = () => (
    useContext(AuthContext)
)
const googleProvider = new GoogleAuthProvider()

export const AuthProvide = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)

    const registerUser = async(email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = async(email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    const logout = async () => {
        return await signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)


            if (user) {
                const {email, displayName, photoURL} = user
                const userD = {
                    email: email,
                    username: displayName,
                    photo: photoURL,
                }
                setUserData(userD)
              } else {
                
              }            
        })
        return () => unsubscribe()
    }, [])



    const value = {
        loading,
        currentUser,
        
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
        userData
    }
    

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}



