import uuidv4 from "uuid/v4";
import models from '../models';
const { users, messages } = models;

export default {
  Query: {
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    }
  },
  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = { id, text, userId: me.id };
      messages[id] = message;
      users[me.id].messageIds.push(id);
      return message;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;
      if (!message) {
        return false;
      }
      messages = otherMessages;
      return true;
    }
  },

  Message: {
    user: message => {
      return users[message.userId];
    }
  }
};
