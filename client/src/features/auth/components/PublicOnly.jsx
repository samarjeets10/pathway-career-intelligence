import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Spinner } from "../../../components/ui/spinner"

function PublicOnly() {

    const { loading, user } = useAuth();

    const location = useLocation();

    if (loading) {
        return (
            <main className="min-h-screen grid place-items-center">
                <Spinner />
            </main>
        );
    }

    if (user) {
        const from = location.state?.from?.pathname;

        return (
            <Navigate replace to={from || "/dashboard"} />
        );
    }

  return <Outlet />

}

export default PublicOnly
