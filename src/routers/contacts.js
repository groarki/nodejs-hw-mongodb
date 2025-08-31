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
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/validation.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

//get all contacts
router.get('/', ctrlWrapper(getAllContactsController));

//get one contact by id
router.get('/:contactId', isValidId, ctrlWrapper(getContactController));

//post new contact
router.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

//update contact
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(upsertContactController),
);

//delete contact
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
