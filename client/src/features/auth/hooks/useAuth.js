import { useContext } from "react";
import { AuthContext } from '../../../app/providers/AuthProvider';
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used with in AuthProvider");
    }

    const { user, setUser, loading, actionLoading, setActionLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setActionLoading(true);

        try {
            const data = await login({
                email,
                password
            });

            setUser(data.user);

            return data;
        } finally {
            setActionLoading(false);
        }
    };


    const handleRegister = async ({
        username,
        email,
        password
    }) => {
        setActionLoading(true);

        try {
            const data = await register({
                username,
                email,
                password
            });

            setUser(data.user);

            return data;
        } finally {
            setActionLoading(false);
        }
    };


    const handleLogout = async () => {
        setActionLoading(true);


        try {
            const data = await logout();
            setUser(null);
            return data;
        } finally {
            setActionLoading(false);
        }
    };


    return {
        user,
        loading,
        actionLoading,
        handleLogin,
        handleRegister,
        handleLogout
    };
};