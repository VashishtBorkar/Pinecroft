import { createContext, useState } from "react";

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
    const [modalType, setModalType] = useState("hidden");  // 'hidden', 'login', 'register'

    return (
        <AuthModalContext.Provider value={{ modalType, setModalType }}>
            {children}
        </AuthModalContext.Provider>
    );
}

export default AuthModalContext;
