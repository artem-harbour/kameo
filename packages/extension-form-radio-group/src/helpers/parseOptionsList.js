export const parseOptionsList = (str) => {
  if (!str) return [];
  let optionsList;
  try {
    optionsList = JSON.parse(str);
  } catch (error) {
    return [];
  }
  if (!Array.isArray(optionsList)) {
    return [];
  }
  return optionsList;
};
