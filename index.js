const {program} = require('commander')
const contactsCases = require('./contacts')
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const invokeAction = async({ action, id, name, email, phone }) =>{
  switch (action) {
    case "list":
      const contacts = await contactsCases.listContacts();
      return console.table(contacts);
      break;

    case "get":
      const findContact = await contactsCases.getContactById(id);
      return console.log(findContact);
    break;

        case "add":
      const newContact = await contactsCases.addContact(name, email, phone);
      console.log(newContact);
          break;

        case "remove":
      const deleteContact = await contactsCases.removeContact(id)
      console.log(deleteContact);
          break;

        default:
          console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);









