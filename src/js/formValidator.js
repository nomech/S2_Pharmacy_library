const formValidator = (form, mode) => {
  let type = "common";
  let isValid = true;
  const productData = {};

  for (let element of form) {
    if (element.tagName === "INPUT" || element.tagName === "SELECT") {
      if (type === element.dataset.type) {
        if (!element.value || element.value === "none") {
          element.placeholder = `${element.name} is required`;
          isValid = false;

          if (element.tagName === "SELECT" || element.type === `date`) {
            element.nextElementSibling.style.display = "block";
          }
        } else if (element.tagName === "SELECT") {
          element.nextElementSibling.style.display = "none";
        }
        if (element.name === "type") {
          type = element.value;
        }
      }
    }
    if (
      element.name === "name" ||
      element.name === "manufacturer" ||
      element.name === "type"
    ) {
      productData[element.name] = element.value.toLowerCase();
    }
  }

  const duplicateCheck = ChcekExistingDataForDuplicates(productData);
  return { duplicateCheck, isValid };
};

const ChcekExistingDataForDuplicates = (data) => {
  let duplicatesFound = false;
  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product) => {
    if (Object.keys(data).every((key) => 
      data[key] === product[key].toLowerCase())) {
      duplicatesFound = true;
    }
  });

  return duplicatesFound;
};
export default formValidator;
