import ContactsForm from 'components/ContactsForm/ContactsForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';
import users from '../../assets/users.json';

import { Component } from 'react';
import { Container } from './App.styled';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: users,
    filter: '',
  };

  handleSaveContact = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const { contacts } = this.state;
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
      this.setState(({ contacts }) => {
        return {
          contacts: [...contacts, contact],
        };
      });
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = IdContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== IdContact),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (contacts && parsedContacts.length) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={this.handleSaveContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactsList
          contacts={this.getContacts()}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
