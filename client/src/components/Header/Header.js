import Logo from "../../icons/pinecroft_placeholder_logo.jpeg";
import { CogIcon, WalletIcon, UserIcon, ChevronDownIcon, PlusIcon} from '@heroicons/react/24/outline';
import {useState, useEffect, useRef, useContext} from 'react';
import { UserContext } from "../Login/UserContext.js";
import SearchBar from "./SearchBar.js";
import { Link, useNavigate } from 'react-router-dom'; 



function Header(){

  // Profile drop down menu
  const [isDropdownOpen, setDropdownOpen] = useState(false); // dropdown menu use state
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);


  

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    // Attach event listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Cleanup event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

    return (
      <header className="sticky top-0 flex w-full z-10 p-4 border-b border-border-color bg-main-bg items-center justify-between" > 
      {/* LOGO */}
      <div className="flex">
        <img src={Logo} className="w-8 h-8 rounded-full" alt=""/>
        <div className="text-text-color text-3xl font-serif mx-4">
          Pinecroft
        </div>
      </div>

      {/*SEARCH BAR*/}
      <SearchBar/>

      <div className="flex gap-4 justify-end items-center">
        {user && (
          <div className="flex items-center gap-4">
              <Link 
                className="flex items-center rounded-full border border-border-color px-3 py-2 hover:text-blue-500 hover-custom"
                to="/create"  
              >
                <PlusIcon className="w-6 h-6 mr-1 text-text-color"/> 
                <p className="text-text-color">Create</p>
              </Link>

            <Link 
              to="/wallet"
              className="p-1 hover:text-blue-500 rounded-lg hover-custom">
              <WalletIcon className="h-8 w-8 text-text-color"/>
            </Link>

            <button className="p-1 hover:text-blue-500 rounded-lg hover-custom"> 
              <CogIcon className="h-8 w-8 text-text-color"/>
            </button>
          
            <button 
              className="flex border p-1 border-border-color items-center hover:text-blue-500 rounded-lg hover-custom"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              ref={dropdownRef}
              > 
                <UserIcon className="h-6 w-6 text-text-color"/>
                <ChevronDownIcon className="h-4 w-4 text-text-color"/>
            </button> 

            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 top-12 mt-2 w-40 bg-black border-x border-border-color rounded-lg shadow-lg">
                <ul className="text-white">
                  <li 
                    className="px-4 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer border-t border-border-color" 
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate(`/auth/user/${user.id}`);
                    }}
                  >
                    View Profile
                  </li>

                  <li 
                    className="px-4 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer" 
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                  >
                    Profile Settings
                  </li>

                  <li 
                    className="px-4 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer border-b border-border-color" 
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}

          </div>
        )}

      </div>
      </header>

    )
}

export default Header;