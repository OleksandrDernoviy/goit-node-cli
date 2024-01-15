
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("db/contacts.json");

const listContacts = async () => {
const data = await fs.readFile(contactsPath);
const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
const contacts = await listContacts();
const findContact = contacts.find((contact) => contact.id === contactId);
    return findContact || null;
};

const removeContact = async (contactId) => {
const contacts = await listContacts();
const findContactByIndex = contacts.findIndex(
  (contact) => contact.id === contactId);
  if (findContactByIndex === -1) {
    return null;
  }
const deleteContact = contacts[findContactByIndex];
  contacts.splice(findContactByIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deleteContact;
};

const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    return null;
  }

const newContactId = nanoid();
const contactsArr = { id: newContactId, name, email, phone };
const contacts = await listContacts();
  contacts.push(contactsArr);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contactsArr;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};