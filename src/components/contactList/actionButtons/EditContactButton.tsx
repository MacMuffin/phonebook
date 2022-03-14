import { EditIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { usePhonebookContext } from "../../../contexts/PhonebookContext";
import { Contact } from "../../../types/Contact";
import { ContactForm } from "../../forms/ContactForm";

type EditContactButtonProps = {
  contact: Contact;
};

const EditContactButton = ({ contact }: EditContactButtonProps) => {
  const [editPopoverIsOpen, setEditPopoverIsOpen] = useState(false);
  const { updateContact } = usePhonebookContext();

  const handleEditContact = (contact: Contact) => {
    updateContact(contact);
    setEditPopoverIsOpen(false);
  };

  const handleToggelEditPopover = () => {
    setEditPopoverIsOpen(!editPopoverIsOpen);
  };

  return (
    <Popover isOpen={editPopoverIsOpen} onClose={handleToggelEditPopover}>
      <PopoverTrigger>
        <IconButton
          colorScheme='blue'
          aria-label='Edit contact'
          icon={<EditIcon />}
          onClick={handleToggelEditPopover}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Edit contact</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <ContactForm
              initialValues={contact}
              onSubmit={handleEditContact}
              FormContainer={VStack}
            />
          </PopoverBody>
          <PopoverFooter>Click submit to update contact</PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export { EditContactButton };
