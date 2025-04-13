import { createContext, useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const UserContext = createContext(null);
 
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

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

    useEffect(() => {
        axios.get("http://localhost:4000/api/auth/user", { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(() => setUser(null));
    }, []);

    const logout = async () => {
        console.log("logging out");
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
            // First login
            const loginResponse = await axios.post(
                "http://localhost:4000/api/auth/login", 
                { username, password }, 
                { withCredentials: true }
            );
            
            // Then fetch user data
            await fetchUserData();
            return {success:true}; // Indicate success
        } catch (error) {
            console.error("Login error:", error);
        
            if (error.response) {
                if (error.response.status === 401) {
                    return { success: false, message: "Invalid username or password" };
                } else if (error.response.data && error.response.data.error) {
                    return { success: false, message: error.response.data.error };
                }
            }
            
            return { success: false, message: "Login failed. Please try again." };
        }
    };


    return (
        <UserContext.Provider value={{ user, setUser, login, logout}}>
            {children}
        </UserContext.Provider>
    );
 }

export { UserContext };
export default UserProvider;
