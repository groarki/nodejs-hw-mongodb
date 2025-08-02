import { ContactsCollection } from '../db/models/contactsModel.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  console.log(contacts);
  return contacts;
};

export const getContact = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  console.log(contact);
  return contact;
};
