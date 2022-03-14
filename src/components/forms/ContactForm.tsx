import { Button, HStack } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import { object, string } from "yup";
import { FormikField } from "./FormikField";

type ContactFormFields = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = object({
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

const defaultInitialValues: ContactFormFields = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

type ContactFormProps = {
  initialValues?: ContactFormFields;
  onSubmit: (values: ContactFormFields) => void;
  FormContainer?: React.ComponentType;
};

const ContactForm = ({
  onSubmit,
  initialValues = defaultInitialValues,
  FormContainer = HStack,
}: ContactFormProps) => {
  const handleSubmit = (
    values: ContactFormFields,
    actions: FormikHelpers<ContactFormFields>
  ) => {
    setTimeout(() => {
      onSubmit(values);
      actions.setSubmitting(false);
      actions.resetForm();
    }, 1000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(props: FormikProps<ContactFormFields>) => {
        console.log("formikProps", props);
        return (
          <Form>
            <FormContainer>
              <FormikField name='firstName' label='First Name' />
              <FormikField name='lastName' label='Last Name' />
              <FormikField name='phoneNumber' label='Phone Number' />
            </FormContainer>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              disabled={props.isSubmitting || !props.isValid}
              type='submit'
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export { ContactForm };
