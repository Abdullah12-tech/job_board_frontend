import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [isSigning, setIsSigning] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("");
    const [status, setStatus] = useState("verifying");
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const [verifyMessage, setVerifyMessage] = useState("")
    const [loading,setLoading] = useState(false);
    const [user, setUser] = useState("");

    const isAuthenticated = () => {
        if (!token) {
            return false
        } else {
            return true
        }
    }

    useEffect(() => {
        if (token) {
            const user = JSON.parse(atob(token.split(".")[1]));
            setCurrentUser(user);
            console.log(user);
              
        }
    }, [token])
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


    const fetchCandidateProfile = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}/candidates/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch profile");
      }

      const data = await res.json();
      
      // Format dates for form inputs
      const formattedData = {
        ...data.user,
        ...data.candidate,
        experiences: data.candidate.experiences?.map(exp => ({
          ...exp,
          startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
          endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
        })) || [],
        education: data.candidate.education?.map(edu => ({
          ...edu,
          startDate: edu.startDate ? edu.startDate.split('T')[0] : '',
          endDate: edu.endDate ? edu.endDate.split('T')[0] : '',
        })) || [],
      };

      setUser(formattedData);
      return formattedData;
    } catch (error) {
      console.error("Fetch profile error:", error);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Memoized update function with date handling
  const updateCandidateProfile = useCallback(async (formData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      // Prepare data for API - convert dates to ISO strings
      const apiData = {
        ...formData,
        experiences: formData.experiences?.map(exp => ({
          ...exp,
          startDate: exp.startDate ? new Date(exp.startDate).toISOString() : null,
          endDate: exp.currentlyWorking ? null : (exp.endDate ? new Date(exp.endDate).toISOString() : null),
        })) || [],
        education: formData.education?.map(edu => ({
          ...edu,
          startDate: edu.startDate ? new Date(edu.startDate).toISOString() : null,
          endDate: edu.currentlyStudying ? null : (edu.endDate ? new Date(edu.endDate).toISOString() : null),
        })) || [],
      };

      const res = await fetch(`${baseUrl}/candidates/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await res.json();
      
      // Update local user state with formatted dates
      const formattedData = {
        ...apiData,
        experiences: apiData.experiences?.map(exp => ({
          ...exp,
          startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
          endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
        })),
        education: apiData.education?.map(edu => ({
          ...edu,
          startDate: edu.startDate ? edu.startDate.split('T')[0] : '',
          endDate: edu.endDate ? edu.endDate.split('T')[0] : '',
        })),
      };

      setUser(formattedData);
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Memoize the context value to prevent unnecessary re-renders

    const sendPassEmail = async (formData) => {
        setIsSigning(true)
        try {
            const res = await fetch(`${baseUrl}/auth/findEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (!res.ok && data.status === "error") {
                throw new Error(data.message)
            }
            toast.success("A password reset email has been sent to you.");
            setIsSubmitted(true);
        } catch (err) {
            console.log(err);
            toast.warning(err.message)
        } finally {
            setIsSigning(false)
            setIsSubmitted(false)
        }
    }


    const verifyAndChangePass = async (formData, token) => {
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

        } finally {
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
            } else {
                navigate("/dashboard/candidate")
            }
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
            if (res.ok) {
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
        status,
        isSubmitted,
        user,
        fetchCandidateProfile,
        updateCandidateProfile
    }
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider