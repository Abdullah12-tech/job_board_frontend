import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
    const accessToken = localStorage.getItem("accessToken")
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [isSigning, setIsSigning] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const [error,setError] = useState("");
    const [status, setStatus] = useState("verifying");
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const [verifyMessage, setVerifyMessage] = useState("")

    const isAuthenticated = () => {
        if (!accessToken) {
            return false
        } else {
            return true
        }
    }

    useEffect(()=>{
        if(token){
            const user = JSON.parse(atob(token.split(".")[1]));
            setCurrentUser(user);
            console.log(user);
        }
    },[])
    const signup = async (formData) => {
        setIsSigning(true)
        try {
            const response = await fetch(`${baseUrl}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            console.log(data);

            if (!response.ok && data.status === "error") {
                throw new Error(data.message || "Something went wrong")
            }
            toast.success("You have successfully signed up, a verification mail has been sent to you.")
            navigate("/login")

        } catch (error) {
            console.log(error)
            toast.warning(error.message)
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
            const res = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (!res.ok || data.status === "error") {
                throw new Error(data.message);
            }
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken)
            toast.success("You have successfully loggedin")
            if (data.user.role === "employer") {
                navigate("/dashboard/company")
            }else{
                navigate("/dashboard/candidate")
            }
            // toast.success("You have successfully logged in")
            navigate("/dashboard/candidate")
        } catch (err) {
            console.log(err);
            toast.warning(err.message);
        } finally {
            setIsSigning(false)
        }
    }

    const verifyEmail = async (token) => {
        setStatus("verifying");
        try {
            const res = await fetch(`${baseUrl}/auth/verify/${token}`, {
                method: "POST",
            })
            const data = await res.json()
            if(res.ok){
                setStatus("success")
            }
            console.log(data);
            setVerifyMessage(data.message)
        } catch (err) {
            console.log(err);
            setStatus("error")
            setVerifyMessage(err)
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
        currentUser,
        status
    }
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider