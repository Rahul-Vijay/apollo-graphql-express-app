import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import models from "./models";
import resolvers from "./resolvers";
import schema from "./schema";

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1]
  }
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
  console.log("Server running on 8k");
});
