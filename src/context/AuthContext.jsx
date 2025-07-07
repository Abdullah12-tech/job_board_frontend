import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "sooner"

export const authContext = createContext();

const AuthProvider = ({ children }) => {
    const accessToken = localStorage.getItem("accessToken")
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [isSigning, setIsSigning] = useState(false)
    const navigate = useNavigate();
    const [verifyMessage, setVerifyMessage] = useState("")

    const isAuthenticated = () => {
        if (!accessToken) {
            return false
        } else {
            return true
        }
    }

    const fetchCurrentUser = async ()=>{
        try {
            const res = await fetch(`${baseUrl}/auth/${accessToken}`)
        } catch (err) {
            console.log(err);
        }
    }
    const signup = async (formData) => {
        setIsSigning(true)
        try {
            const response = await fetch(`${baseUrl}auth/signup`, {
                method: "POST",
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            console.log(data);

            if (!response.ok && data.status === "error") {
                // toast.warning(`${data.message}`)
                return
            }
            // toast.success("You have successfully signed up, a verification mail has been sent to you.")
            navigate("/signin")

        } catch (error) {
            console.log(error)
        } finally {
            setIsSigning(false)
        }
    }



    const sendPassEmail = async (formData) => {
        setIsSigning(true)
        try {
            const res = await fetch(`${baseUrl}auth/findEmail`, {
                method: "POST",
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (!res.ok && data.status === "error") {
                toast.warning("Email doesnot exist")
            }
            toast.success("A password reset email has been sent to you.");
        } catch (err) {
            console.log(err);
        }finally{
            setIsSigning(false)
        }
    }


    const verifyAndChangePass = async (formData, token)=>{
        setIsSigning(true)
        try {
            const res = await fetch(`${baseUrl}auth/verifyPass/${token}`, {
                method: "POST",
                body: JSON.stringify(formData)
            })
            const data = res.json()
            if (!res.ok && data.status === "error") {
                toast.warning(data.message)
            }
            toast.success("Password have been changed")
        } catch (err) {
            
        }finally{
            setIsSigning(false)
        }
    }



    const signin = async (formData) => {
        setIsSigning(true)
        try {
            const res = await fetch(`${baseUrl}auth/login`, {
                method: "POST",
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (!res.ok || data.status === "error") {
                // toast.warning(data.message);
                return
            }
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken)
            // toast.success("You have successfully logged in")
            navigate("/dashboard")
        } catch (err) {
            console.log(err);
        } finally {
            setIsSigning(false)
        }
    }


    const verifyEmail = async (token) => {
        try {
            const res = await fetch(`${baseUrl}auth/verify/${token}`, {
                method: "POST",
            })
            const data = await res.json()
            console.log(data);
            setVerifyMessage(data.message)
        } catch (err) {
            console.log(err);
        }
    }



    const value = {
        isAuthenticated,
        verifyEmail,
        signin,
        isSigning,
        verifyMessage,
        signup,
        sendPassEmail,
        verifyAndChangePass,
        fetchCurrentUser
    }
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider