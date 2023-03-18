import ContactsForm from 'components/ContactsForm/ContactsForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';

import { Container } from './App.styled';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSaveContact = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const normalizedName = name.toLowerCase();
    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(`${name} is already in contacts list`);
      return;
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts list`);
      return;
    } else {
      setContacts(prevContacts => [...prevContacts, contact]);
    }
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = IdContact => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== IdContact)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactsForm onSubmit={handleSaveContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList contacts={getContacts()} onDeleteContact={deleteContact} />
    </Container>
  );
};

export default App;
