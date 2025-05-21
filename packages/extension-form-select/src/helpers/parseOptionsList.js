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
  return optionsList.filter((option) => {
    return Object.hasOwn(option, 'value') 
      && Object.hasOwn(option, 'label') 
      && Object.hasOwn(option, 'disabled')
  });
};
