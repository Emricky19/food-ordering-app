import dotenv from "dotenv"
dotenv.config()

import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs.js"
import resolvers from "./graphql/resolvers/index.js"

import mongoose from "mongoose";


const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDb connected...");
  })
  .catch(() => {
    console.log("Failed to connect to Mongo");
  });

server.listen({ port: 8000 || process.env.PORT }).then(({ url }) => {
  console.log(`Server running on port ${url}`);
});

