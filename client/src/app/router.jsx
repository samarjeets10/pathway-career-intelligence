import { createBrowserRouter } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import PageNotFound from "../features/auth/pages/PageNotFound"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import Dashboard from "../features/auth/pages/Dashboard"
import Protected from "../features/auth/components/Protected"
import PublicOnly from "../features/auth/components/PublicOnly"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },

    {
        element: <PublicOnly />,
        children: [
            {
                path: "/login",
                element: <Login />
            },

            {
                path: "/register",
                element: <Register />
            }
        ],
    },

    {
        path: "/dashboard",
        element: (
            <Protected>
                <Dashboard />
            </Protected>
        ),
    },

    {
        path: "/404Page",
        element: <PageNotFound />
        
    },

    {
        path: "*",
        element: <PageNotFound />
    },

]);