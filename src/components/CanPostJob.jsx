import { useContext, useEffect } from "react"
import { authContext } from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom"

const CanPostJob = () => {
    const { currentUser } = useContext(authContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser && currentUser.role !== "employer" && currentUser.role !== "admin") {
            navigate("/dashboard/candidate")
        }
    }, [currentUser, navigate])

    return currentUser?.role === "employer" || currentUser?.role === "admin" ? <Outlet /> : null
}

export default CanPostJob
