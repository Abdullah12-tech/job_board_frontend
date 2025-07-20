import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const IsCandidate = () => {
  const { currentUser, fetchCurrentUser } = useContext(authContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCheck = async () => {
      await fetchCurrentUser(); // fetches and sets currentUser
      setLoading(false); // avoid checking until after fetch completes
    };
    fetchAndCheck();
  }, []);

  useEffect(() => {
    if (!loading && currentUser && currentUser.role !== "candidate") {
      navigate("/dashboard/company");
    }
  }, [loading, currentUser, navigate]);

  if (loading) return null; // or return a loading spinner

  return currentUser?.role === "candidate" ? <Outlet /> : null;
};

export default IsCandidate;
