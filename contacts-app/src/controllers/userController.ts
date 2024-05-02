import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from "../models/userModel";

// @desc Register User
// @route POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All Fields Are Mandatory")
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400);
        throw new Error("User Already Exists")
    }
    // HashPassword
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    console.log(`User Created Successfully ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User Data Not Valid")
    }
    res.json({ message: "Register User" })
})

// @desc Login User
// @route POST /api/user/login
// @access public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields Are Mandatory") 
    }
    const user = await User.findOne({ email })
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECRET || "Shrey@123",
            { expiresIn: "15m" })
        res.status(200).json({ accessToken })
    } else {
        res.status(401);
        throw new Error("Email or Password Is Not Valid")
    }
})

// @desc Current User Info
// @route GET /api/user/current
// @access private
const currentUser = asyncHandler(async (req: any, res: Response) => {
    res.json(req.user)
})

export { registerUser, loginUser, currentUser }

