import Contact from "../models/contactModel.js";
import asyncHandler from "express-async-handler";

/** 
 * @description    Get logged in user contacts
 * @route   GET /api/contacts
 * @access  Private 
**/
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user: req.user._id });
  res.json(contacts);
});

/** 
 * @description     Fetch single Contact
 * @route           GET /api/contacts/:id
 * @access          Public 
 * */
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact not found" });
  }

  res.json(contact);
});

/**
 * @description     Create single Contact
 * @route           GET /api/contacts/create
 * @access          Private 
 * */
const CreateContact = asyncHandler(async (req, res) => {
  const { name, number, department} = req.body;

  console.log("at contactsController ",req.body)

  if (!name || !number || !department) {
    res.status(400);
    throw new Error("Please Fill all the fields");
    return;
  } else {
    const contact = new Contact({ user: req.user._id, name, number, department});

    const createdContact = await contact.save();

    res.status(201).json(createdContact);
  }
});

/**
 * @description     Delete single Contact
 *@route           GET /api/contacts/:id
 *@access          Private
 **/
const DeleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (contact) {
    await contact.remove();
    res.json({ message: "Contact Removed" });
  } else {
    res.status(404);
    throw new Error("Contact not Found");
  }
});

/** 
*@desc    Update a contact
*@route   PUT /api/contacts/:id
*@access  Private
**/
const UpdateContact = asyncHandler(async (req, res) => {
  const { name, number, department } = req.body;

  const contact = await Contact.findById(req.params.id);

  if (contact.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (contact) {
    contact.name = name;
    contact.number = number;
    contact.department = department;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } else {
    res.status(404);
    throw new Error("Contact not found");
  }
});

export { getContactById, getContacts, CreateContact, DeleteContact, UpdateContact };
