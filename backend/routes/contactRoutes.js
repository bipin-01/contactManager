
import express from "express";
import {
  getContactById,
  getContacts,
  CreateContact,
  DeleteContact,
  UpdateContact,
} from "../controllers/contactsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc create a route for contacts
// uses the protect middleware that require authentication
// uses the routed having id for deleting and edition single contact
router.route("/").get(protect, getContacts);
router
  .route("/:id")
  .get(getContactById)
  .delete(protect, DeleteContact)
  .put(protect, UpdateContact);
router.route("/create").post(protect, CreateContact);

export default router;
