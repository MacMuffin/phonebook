import { usePhonebookContext } from "../../contexts/PhonebookContext";
import { ContactForm } from "./ContactForm";

const NewContactForm = () => {
  const { addContact } = usePhonebookContext();

  return <ContactForm onSubmit={addContact} />;
};

export { NewContactForm };
