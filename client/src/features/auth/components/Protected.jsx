import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "../hooks/useAuth";

function Protected({ children }) {
    const { loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <main className="min-h-screen grid place-items-center">
                <Spinner />
            </main>
        );
    }

    if (!user) {
        return <Navigate replace to="/login" state={{ from: location }} />;
    }

    return children;
}

export default Protected;
