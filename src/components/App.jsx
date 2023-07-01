import { Component } from 'react';
import { nanoid } from 'nanoid';

import Section from "./Section";
import ContactForm from './ContactForm';
import FilterInput from './FilterInput/FilterInput';
import ContactsList from './ContactsList/ContactsList';
import { loadLocalStorage, saveLocalStorage } from 'utils/localStorage';

export default class App extends Component {

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    hasError: false,
  };

  addContact = data => {
    const { contacts } = this.state;
    const newContact = { ...data, id: nanoid(), };

    contacts.some(({ name }) => name === data.name)
      ? alert(`${data.name} is duplicate contact`)
      : this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
  };

  delContact = userId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== userId),
    }));
  };

  handleChangeFilter = ({ currentTarget: { value } }) => {
    this.setState({ filter: value });
  };

  getFilterContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  //================================================================
  componentDidMount() {
    const contacts = loadLocalStorage();
    if (contacts) this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      saveLocalStorage(this.state.contacts)
    }
  }

  componentDidCatch(error, info) {
    // Якщо метод був викликаний, отже, є помилка!
    // Встановлюємо стан
    this.setState({ hasError: true });
    // Також можна надіслати звіт про помилку вашому аналітичному сервісу
    // logErrorToMyService(error, info);
  }

  //================================================================
  render() {
    if (this.state.hasError) {
      // Рендеримо fallback UI
      return <h1>Something went wrong, ERROR</h1>;
    }

    return (
      <>
        <Section title="Phonebook">
          <ContactForm addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          <FilterInput value={this.state.filter} onChangeFilter={this.handleChangeFilter} />
          <ContactsList contacts={this.getFilterContacts()} delContact={this.delContact} />
        </Section>
      </>)
  }
}