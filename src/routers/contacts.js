import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactsSchema } from '../validation/validation.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

//get all contacts
router.get('/contacts', ctrlWrapper(getAllContactsController));

//get one contact by id
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactController),
);

//post new contact
router.post(
  '/contacts',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

//update contact
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(createContactsSchema),
  ctrlWrapper(upsertContactController),
);

//delete contact
router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
