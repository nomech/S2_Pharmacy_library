const formValidator = (form, id) => {
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

  const duplicateCheck = CheckExistingDataForDuplicates(
    productData,
    form.dataset.mode,
    id
  );

  return { duplicateCheck, isValid };
};

const CheckExistingDataForDuplicates = (data, mode, id) => {
  let duplicatesFound = false;
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productsData = products.find((product) => product.id === id);

  if (mode === "edit") {
    Object.keys(data).forEach((key) => {
      if (productsData[key].toLowerCase() !== data[key]) {
        duplicatesFound = duplicateChecker(products, data);
        console.log(duplicatesFound);
      } else {
        return duplicatesFound;
      }
    });
  } else {
    duplicatesFound = duplicateChecker(products, data);
  }

  return duplicatesFound;
};

const duplicateChecker = (products, data) => {
  let duplicates = false;
  products.forEach((product) => {
    if (
      Object.keys(data).every((key) => data[key] === product[key].toLowerCase())
    ) {
      duplicates = true;
    }
  });
  return duplicates;
};

export default formValidator;
