import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Heading,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { ContactList } from "./components/contactList/ContactList";
import { NewContactForm } from "./components/forms/NewContactForm";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl'>
      <Grid p={3}>
        <ColorModeSwitcher justifySelf='flex-end' />
        <VStack spacing={8}>
          <Heading>Add new Contact Form</Heading>
          <NewContactForm />
        </VStack>
        <VStack spacing={8} p={8}>
          <Heading>Contact List</Heading>
          <ContactList />
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
