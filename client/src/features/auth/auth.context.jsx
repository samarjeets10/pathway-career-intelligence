import { createContext, useContext, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            { children }
        </AuthContext.Provider>
    )
};


// export const useAuth = () => {
//     const context = useContext(AuthContext);
// 
//     if (context === undefined) {
//         throw new Error("useAuth must be used with an AuthProvider")
//     }
// 
//     return context;
// }