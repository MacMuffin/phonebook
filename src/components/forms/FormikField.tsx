import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { Contact } from "../../types/Contact";

type FormikFieldProps = {
  name: keyof Contact;
  label: string;
};

const FormikField = ({ name, label }: FormikFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<typeof name, Contact>) => (
        <FormControl isInvalid={!!form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input {...field} id={name} placeholder={label} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export { FormikField };
