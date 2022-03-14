import { object, string } from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const contactFormValidationSchema = object({
  firstName: string()
    .max(15, "First name must be 15 characters or less")
    .required("First name is required"),
  lastName: string()
    .max(20, "Last name must be 20 characters or less")
    .required("Last name is required"),
  phoneNumber: string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});

export { contactFormValidationSchema };
