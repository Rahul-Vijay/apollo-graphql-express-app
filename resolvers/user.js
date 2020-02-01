import models from '../models';
const { users, messages } = models;

export default {
  Query: {
    users: (parent, args) => {
      console.log(users);
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    }
  },
  User: {
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id
      );
    }
  }
};
