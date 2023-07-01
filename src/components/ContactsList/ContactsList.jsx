import PropTypes from 'prop-types';

import { List } from './ContactsList.styled';
import ContactsItem from 'components/ContactItem';


const ContactsList = ({ contacts, delContact }) => {
  return (
    <List>
      {contacts.map(({ name, number, id }) => (
        <ContactsItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={delContact}
        />
      ))}
    </List>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
 
    }).isRequired
  ),
  delContact: PropTypes.func,
};

export default ContactsList;