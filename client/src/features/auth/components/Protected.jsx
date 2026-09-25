import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Protected({ children }) {
    const { loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <main className="min-h-screen grid place-items-center">
                <p className="text-sm text-neutral-500">Checking your session...</p>
            </main>
        );
    }

    if (!user) {
        return <Navigate replace to="/login" state={{ from: location }} />;
    }

    return children;
}

export default Protected;
