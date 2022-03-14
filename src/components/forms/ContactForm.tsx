import { Button, HStack } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import { Contact } from "../../types/Contact";
import { FormikField } from "./FormikField";
import { contactFormValidationSchema } from "./utils/validations";

const defaultInitialValues: Contact = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

type ContactFormProps = {
  initialValues?: Contact;
  onSubmit: (values: Contact) => void;
  FormContainer?: React.ComponentType;
};

const ContactForm = ({
  onSubmit,
  initialValues = defaultInitialValues,
  FormContainer = HStack,
}: ContactFormProps) => {
  const handleSubmit = (values: Contact, actions: FormikHelpers<Contact>) => {
    setTimeout(() => {
      onSubmit(values);
      actions.setSubmitting(false);
      actions.resetForm();
    }, 1000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactFormValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(props: FormikProps<Contact>) => {
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
