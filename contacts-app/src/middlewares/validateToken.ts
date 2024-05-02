import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const validateToken = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const secretKey: string = process.env.ACCESS_TOKEN_SECRET || "Shrey@123"
    let token;
    let authHeader: any = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, secretKey, (err: any, decoded: any) => {
            if (err) {
                res.status(401)
                throw new Error("User Is Not Authorized")
            }
            req.user = decoded.user;
            next()
        })
        if (!token) {
            res.status(401);
            throw new Error("User Is Not Authorized Or Token Is Missing")
        }
    }

})

export default validateToken