const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return;

  const normalized = value.toLowerCase().trim();
  return normalized === 'true'
    ? true
    : normalized === 'false'
    ? false
    : undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
