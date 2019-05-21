import get from "lodash.get";

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
  const { shipDate, cases, brewMethodID, coffeeID, caseTypeID } = values; 
  if (!shipDate || !dateIsValid(shipDate)) {
    errors.shipDate = 'Invalid Ship Date';
  }
  if (!cases || cases < 1) {
    errors.cases = 'Cases is required and must be greater than 1';
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

export const formatData = (data) => {
  const brewMethods = get(data, 'brewMethods', []).map(brewMethod => {
    return { value: brewMethod.id, label: brewMethod.name }
  });;
  const coffees = get(data, 'coffees', []).map(coffee => {
    return { value: coffee.id, label: coffee.name }
  });
  const caseTypes = get(data, 'caseTypes', []).map(caseType => {
    return { value: caseType.id, label: caseType.capacity }
  });
  return {
    brewMethods,
    coffees,
    caseTypes
  }
}
