import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Read JWT from cookies

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        // Verify JWT and extract user data
        const decoded = jwt.verify(token, secret);
        req.user = { id: decoded.id }; 

        next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
