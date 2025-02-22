const formValidator = (form) => {
  let type = "common";
  let isValid = true;

  for (let element of form) {
    if (element.tagName === "INPUT" || element.tagName === "SELECT") {
      if (type === element.dataset.type) {
        if (!element.value || element.value === "none") {
          element.placeholder = `${element.name} is required`;
          isValid = false;

          if (element.tagName === "SELECT") {
            element.nextElementSibling.style.display = "block";
          }
        } else if (element.tagName === "SELECT") {
          element.nextElementSibling.style.display = "none";
        }
        if (element.name === "type") {
          console.log(element.name);

          type = element.value;
          console.log(type);
        }
      }
    }
  }
  return isValid;
};

export default formValidator;
