import { ContactsCollection } from '../db/models/contactsModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
import createHttpError from 'http-errors';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactsQuery = ContactsCollection.find({ userId });

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

export const getContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });

  if (!contact)
    throw createHttpError(404, `Contact from user${userId} not found`);

  return contact;
};

export const createContact = async (body, userId) => {
  const newContact = await ContactsCollection.create({ ...body, userId });
  return newContact;
};

export const upsertContact = async (contactId, body, userId, options = {}) => {
  const updatesContact = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
      userId,
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

export const deleteContact = async (contactId, userId) => {
  const deletedContact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return deletedContact;
};
