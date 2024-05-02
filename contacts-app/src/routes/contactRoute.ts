import express from 'express'
import { getContacts, addContact, getContact, updateContact, deleteContact } from '../controllers/contactController'
import validateToken from '../middlewares/validateToken'
const router = express.Router()

router.use(validateToken)
router.route("/").get(getContacts).post(addContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

export default router