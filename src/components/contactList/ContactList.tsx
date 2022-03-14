import { usePhonebookContext } from "contexts/PhonebookContext";
import {
  Table,
  TableCaption,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ContactListRow } from "./ContactListRow";

const ColumnNamesRow = () => {
  return (
    <Tr>
      <Th>First Name</Th>
      <Th>Last Name</Th>
      <Th>Phone Number</Th>
      <Th>Actions</Th>
    </Tr>
  );
};

const ContactList = () => {
  const { contacts } = usePhonebookContext();

  return (
    <Table variant='striped' colorScheme='teal'>
      <TableCaption>Your own phonebook contacts</TableCaption>
      <Thead>
        <ColumnNamesRow />
      </Thead>
      <Tbody>
        {contacts.map((contact) => (
          <ContactListRow contact={contact} key={`contact_${contact.id}`} />
        ))}
      </Tbody>
      <Tfoot>
        <ColumnNamesRow />
      </Tfoot>
    </Table>
  );
};

export { ContactList };
