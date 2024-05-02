import express from 'express'
import { loginUser, currentUser, registerUser } from '../controllers/userController'
import validateToken from '../middlewares/validateToken'

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", validateToken ,currentUser)

export default router

