import { HStack, Td, Tr } from "@chakra-ui/react";
import { Contact } from "../../types/Contact";
import { DeleteContactButton } from "./actionButtons/DeleteContactButton";
import { EditContactButton } from "./actionButtons/EditContactButton";

type ContactListRowProps = {
  contact: Contact;
};

const ContactListRow = ({ contact }: ContactListRowProps) => {
  return (
    <Tr>
      <Td>{contact.firstName}</Td>
      <Td>{contact.lastName}</Td>
      <Td>{contact.phoneNumber}</Td>
      <Td>
        <HStack spacing={2}>
          <DeleteContactButton contact={contact} />
          <EditContactButton contact={contact} />
        </HStack>
      </Td>
    </Tr>
  );
};

export { ContactListRow };
