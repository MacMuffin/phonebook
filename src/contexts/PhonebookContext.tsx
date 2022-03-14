import { createRequiredContext } from "tools/RequiredContext";
import { Contact } from "types/Contact";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const usePhonebookContextValue = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (contact: Contact) => {
    setContacts([...contacts, { ...contact, id: uuid() }]);
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const updateContact = (contact: Contact) => {
    setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
  };

  return {
    contacts,
    addContact,
    deleteContact,
    updateContact,
  };
};

const [PhonebookContextProvider, usePhonebookContext] = createRequiredContext(
  "PhonebookContext",
  usePhonebookContextValue
);
export { PhonebookContextProvider, usePhonebookContext };
