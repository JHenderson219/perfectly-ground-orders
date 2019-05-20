export const dateIsValid = (dateStr) => {
  const dateRegex = /\d{4}-\d{2}-\d{2}/g;
  return dateRegex.test(dateStr);
}

export const isUUID = (str) => {
  const UUIDRegex = /[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/g
  return UUIDRegex.test(str);
}
export const validateForm = (values = {}) => {
  const errors = {};
  const { shipDate, cases, brewMethodID, coffeeID, caseTypeID, notes } = values; 
  const MAX_NOTES_LENGTH = 255;
  if (!shipDate || !dateIsValid(shipDate)) {
    errors.shipDate = 'Invalid Ship Date';
  }
  if (!cases || cases < 1) {
    errors.cases = 'Invalid number of cases';
  }
  if (!brewMethodID || !isUUID(brewMethodID)) {
    errors.brewMethodID = "Brew method is required";
  }
  if (!coffeeID || !isUUID(coffeeID)) {
    errors.coffeeID = "Coffee type is required";
  }
  if (!caseTypeID || !isUUID(caseTypeID)) {
    errors.caseTypeID = "Packets per case is required";
  }
  return errors;
}
