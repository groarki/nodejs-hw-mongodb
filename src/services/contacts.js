import { ContactsCollection } from '../db/models/contactsModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);
  return {
    data: contacts,
    ...paginationData,
  };
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
