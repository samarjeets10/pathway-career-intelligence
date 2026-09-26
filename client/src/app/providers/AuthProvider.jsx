import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getMe } from "../../features/auth/services/auth.api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const initializeAuth = useCallback(async () => {
        try {
            const data = await getMe();
            setUser(data.user ?? null);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);


    const value = useMemo(() => ({
        user,
        setUser, 
        loading,
        actionLoading,
        setActionLoading
    }), [user, loading, actionLoading])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}