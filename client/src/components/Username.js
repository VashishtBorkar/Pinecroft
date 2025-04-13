import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Username( { username, userId }) {
    const goToAuthor = async(e) => {
        e.stopPropagation(); // Prevents bubbling to the card click
        navigate(`/auth/user/${userId}`);
    };


    const navigate = useNavigate();
    return (
        <span 
            className="cursor-pointer text-white  hover:underline"
            onClick={goToAuthor}
        >
            {username}
        </span>
    )
}

export default Username;