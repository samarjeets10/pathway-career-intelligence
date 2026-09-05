import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom";

function Protected( { children }) {

    const {loading, user} = useAuth();

    if (loading) {
        return (<main>Laoding...</main>);
    };

    if (!user) {
        return <Navigate replace to="/login" />
    };

  return children
}

export default Protected