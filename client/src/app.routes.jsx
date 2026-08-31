import { createBrowserRouter } from 'react-router-dom'
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Protected from './features/auth/components/Protected';


export const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Login />,
    // },

    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/register",
        element: <Register />
    }, 

    // {
    //     path: "/",
    //     element: <h1>Pathway Dashboard</h1>
    // }, 

    {
        path: "/", 
        element: <Protected><h1>Home Page</h1></Protected>
    },

    {
        path: "/",
        element: <h1>Registered User Dashboard</h1>
    }
]);