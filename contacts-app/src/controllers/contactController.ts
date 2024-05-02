import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'
import Contact from "../models/contactModel"

// @desc Get All Contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req: any, res: Response) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})

// @desc Get One Contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req: Request, res: Response) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact)
})

// @desc Create Contact
// @route POST /api/contacts/
// @access private
const addContact = asyncHandler(async (req: any, res: Response) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All Fields Are Mandatory")
    }
    console.log(req.body);
    const contact = Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
})

// @desc Update One Contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req: any, res: Response) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Not Have Permission To Update Other Contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

// @desc Delete One Contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req: any, res: Response) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        throw new Error("Contact Not Found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Not Have Permission To Delete Other Contacts")
    }

    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message: `Deleted Contact ${req.params.id}`
    })
})

export { getContacts, getContact, addContact, updateContact, deleteContact }