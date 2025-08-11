import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

//get all students
router.get('/contacts', ctrlWrapper(getAllContactsController));

//get one contact by id
router.get('/contacts/:contactId', ctrlWrapper(getContactController));

//post new contact
router.post('/contacts', ctrlWrapper(createContactController));

//update contact
router.patch('/contacts/:contactId', ctrlWrapper(upsertContactController));

//delete contact
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
