import express, { Request, Response } from 'express'
import 'dotenv/config'
import contactRoute from './routes/contactRoute'
import userRoute from './routes/userRoute'
import errorHandler from './middlewares/errorHandler'
import connectDB from './config/dbConnection'

connectDB()
const app = express()
app.use(express.json())

const port = process.env.PORT;

app.use("/api/contacts", contactRoute)
app.use("/api/user", userRoute)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server Running On Port http://localhost:${port}`);
})