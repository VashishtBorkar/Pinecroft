import { createContext, useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const UserContext = createContext(null);
 
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4000/api/auth/user", 
                    { withCredentials: true }
                );
                setUser(response.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const logout = async () => {
        try {
            await axios.post(
                "http://localhost:4000/api/auth/logout",
                {},
                { withCredentials: true }
            );
            setUser(null);
        } catch (err) {
            console.error("Logout error:", err);
        }
    };


    const login = async (username, password) => {
        try {
            await axios.post(
                "http://localhost:4000/api/auth/login",
                { username, password },
                { withCredentials: true }
            );
            const response = await axios.get(
                "http://localhost:4000/api/auth/user", 
                { withCredentials: true }
            );
            setUser(response.data);
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "Login failed." };
        }
    };



    return (
        <UserContext.Provider value={{ user, setUser, login, logout, loading}}>
            {children}
        </UserContext.Provider>
    );
 }

export { UserContext };
export default UserProvider;
