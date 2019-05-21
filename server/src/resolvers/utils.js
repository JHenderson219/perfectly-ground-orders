import xss from 'xss';

export const sanitizeCreateWorkOrder = (data = {}) => {
  const clean = Object.assign({}, data);
  if (data.notes) {
    clean.notes = xss(clean.notes);
  }
  return clean;
}

export const getOneByID = async (model, id) => {
  const data = await model.findOne({
    where: {
      id
    }
  })
  return data;
}