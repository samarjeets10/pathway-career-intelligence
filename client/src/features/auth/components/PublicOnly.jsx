import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PublicOnly({ children }) {
    const { loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <main className="min-h-screen grid place-items-center">
                <p className="text-sm text-neutral-500">Checking your session...</p>
            </main>
        );
    }

    if (user) {
        const from = location.state?.from?.pathname;
        return <Navigate replace to={from || "/dashboard"} />;
    }

    return children || <Outlet />;
}

export default PublicOnly;
