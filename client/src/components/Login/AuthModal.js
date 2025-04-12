import Input from "./Input";
import ButtonCustom from "../ ButtonCustom";
import { useState, useContext, useEffect, useRef } from "react";
import axios from 'axios';
import AuthModalContext from "./AuthModalContext";
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import UserContext from "./UserContext.js";



function AuthModal() {
    // Variables for displaying the Log In/Sign up
    const context = useContext(AuthModalContext);
    const {modalType, setModalType} = context;

    const { user, setUser, login } = useContext(UserContext);


    let visibleClass = "";
    if (modalType === 'hidden') {
        visibleClass = 'hidden'
    } else {
        visibleClass = ''
    }
    const modalRef = useRef(null);
    
    // Variables for Log in or Sign Up
    const isLogin = modalType === 'login';
    const title = isLogin ? "Login" : "Sign Up";
    const switchText = isLogin ? "New to Pinecroft? " : "Already have an account? ";
    const switchButtonText = isLogin ? "Sign Up" : "Log In";
    const switchModalType = isLogin ? "register" : "login";
    const [showPassword, setShowPassword] = useState(false);

    // Variables for log in email
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [validEmailError, setValidEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function register(e) {
        e.preventDefault();
        setErrorMessage("");

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage("Enter valid email");
            return;
        }

        // Confirm password
        if (password !== authPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        // Username validation (no spaces)
        if (username.includes(" ")) {
            setErrorMessage("Username cannot contain spaces.");
            return;
        }

        
        const data = {email, username, password}
        axios.post('http://localhost:4000/api/auth/register', data, { withCredentials: true })
        .then(response => {
            //console.log("Response:", response);
            // setIsLoggedIn(true); // Set login state to true
            setUser({email, username, password});
            setModalType('login'); // Close modal
        })
        .catch(error => {
            console.log(error);
            if(error === "Email or Username already exists") {
                setErrorMessage("Email or Username already in use");
            } else {
                console.error("Error:", error);
            }
        });
    }   

    async function handleLogin(e) {
        e.preventDefault();
        // Validation
        if (!username || !password) {
            setErrorMessage("Please enter both username and password");
            return;
        }

        try {
            const result = await login(username, password);
            if (result.success) {
                setModalType('hidden');
            } else {
                setErrorMessage(result.message || "Login failed. Please try again.");
            }
        } catch(error) {
            console.error("Login error:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");

        }
    }

    // Handles click outside 
    useEffect(() => {
        function handleClickOutside(event) {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModalType('hidden');
          }
        }
    
        // Attach event listener when dropdown is open
        if (modalType !== 'hidden') {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          // Cleanup event listener on unmount
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [modalType, setModalType]);

      
    useEffect(() => {
        setEmail("");
        setUsername("");
        setPassword("");
        setShowPassword(false);
    }, [isLogin]);  // Runs whenever isLogin changes

    
    return (
        <div className={"w-screen h-screen items-center justify-center absolute top-0 left-0 z-20 flex bg-black bg-opacity-60 "+visibleClass}>
            <div 
                className="bg-main-bg text-text-color border border-border-color self-center rounded-3xl p-6 "
                ref={modalRef}
                >
                <form 
                    className="w-full flex-col"
                    onSubmit={modalType === "login" ? handleLogin : register}
                >
                    <h2 className="text-xl font-bold text-center">{title}</h2>
                    
                    {modalType === 'register' && (
                        <div className="mb-4">
                            <label className="text-sm">
                                Enter your email
                            <Input type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}/>
                            </label>
                        </div>   
                    )}

                    <div className="mb-4">
                        <label className="text-sm">
                            Username
                            <Input type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
                        </label>
                    </div>
                    
                    <div className="mb-4">
                        <label className="text-sm">
                            Password
                            <div className="relative w-full">
                            <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
                            <button 
                                type="button"
                                className="absolute right-3 top-2.5"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeIcon className="w-5 h-5 text-white"/> : <EyeSlashIcon className="w-5 h-5 text-white"/>}
                            </button>
                            </div>
                        </label>
                    </div>

                    {modalType === 'register' && (
                        <div className="mb-4">
                            <label className="text-sm">
                                Re-enter your password
                            <Input value={authPassword} onChange={e => setAuthPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Re-enter your password" /> 
                            </label>
                        </div>      
                    )}

                    {errorMessage !== "" && (
                        <p className="mt-1" style={{ color: "red", fontSize: "0.9em" }}> {errorMessage} </p>
                    )}
                    
                    
                    <div className="mt-12">
                        {modalType === 'register' && (
                            <button 
                                className="w-full bg-blue-500  rounded-full px-4 py-2 font-bold text-sm hover:bg-blue-400"
                                type="submit"
                            >
                                Sign Up
                            </button>
                            
                        )}

                        {modalType === 'login' && (
                            <button 
                                className="w-full bg-blue-500 rounded-full px-4 py-2 font-bold text-sm hover:bg-blue-400"
                                type="submit"
                            >
                                Log In
                            </button>

                        )}

                        {switchText} <button className="mt-4 text-blue-500 hover:underline " type="button" onClick={() => setModalType(switchModalType)}>{switchButtonText}</button>
                    </div>
                </form>
            </div> 
        </div>
    );
}

export default AuthModal;