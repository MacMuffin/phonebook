import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, FieldAttributes } from "formik";

type FormikFieldProps = {
  name: string;
  label: string;
};

const FormikField = ({ name, label }: FormikFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldAttributes<any>) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input {...field} id={name} placeholder={label} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export { FormikField };
