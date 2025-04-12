import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const secret = "secret123"; // Move this to environment variables in production

export const registerUser = async (req, res) => {
    console.log("Received /register request:", req.body);
    try {
        const { email, username, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email or Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({ email, username, password: hashPassword });

        await user.save(); // Save user in MongoDB
        console.log(user);

        // Create JWT token
        jwt.sign({ id: user._id }, secret, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error creating token" });
            }

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                sameSite: 'strict',
                // secure: true // Uncomment in production
            });

            res.status(201).json({ success: true, message: "User registered successfully" });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const loginUser = (req, res) => {
    const {username, password} = req.body;
    
    User.findOne({username})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Invalid username or password'});
            }
            
            const passOk = bcrypt.compareSync(password, user.password);
            if (passOk) {
                jwt.sign({id: user._id}, secret, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({error: 'Error creating token'});
                    } else {
                        res.cookie('token', token, {
                            httpOnly: true,
                            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                            sameSite: 'strict',
                        }).status(200).json({success: true});
                    }
                });
            } else {
                res.status(401).json({error: 'Invalid username or password'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Server error'});
        });
};

export const getUser = (req, res) => {
    
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        // Verify token
        const userInfo = jwt.verify(token, secret);
        const userId = userInfo.id;
        
        User.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json({
                    id: user._id,
                    username: user.username,
                    email: user.email
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Server error' });
            });
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "strict", secure: true });
    res.status(200).json({ message: "Logged out successfully" });
};