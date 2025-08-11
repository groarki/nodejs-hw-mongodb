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

export const createContact = async (body) => {
  const newContact = await ContactsCollection.create(body);
  return newContact;
};

export const upsertContact = async (contactId, body, options = {}) => {
  const updatesContact = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    body,
    { new: true, includeResultMetadata: true, ...options },
  );
  if (!updatesContact || !updatesContact.value) return null;

  return {
    contact: updatesContact.value,
    isNew: Boolean(updatesContact?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const deletedContact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return deletedContact;
};
