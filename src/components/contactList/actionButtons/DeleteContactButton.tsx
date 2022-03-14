import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { usePhonebookContext } from "contexts/PhonebookContext";
import { Contact } from "types/Contact";

type DeleteContactButtonProps = {
  contact: Contact;
};

const DeleteContactButton = ({ contact }: DeleteContactButtonProps) => {
  const { deleteContact } = usePhonebookContext();

  const handleDeleteContact = () => {
    if (!contact.id) return;
    deleteContact(contact.id);
  };

  return (
    <IconButton
      colorScheme='red'
      aria-label='Delete contact'
      icon={<DeleteIcon />}
      onClick={handleDeleteContact}
    />
  );
};

export { DeleteContactButton };
