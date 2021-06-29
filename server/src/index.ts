import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm"

const PORT = process.env.PORT || 8000;

async function main() {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/resolvers/**/*.ts"],
  });

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  const app = express();

  server.applyMiddleware({ app });

  // Start the server
  app.listen(PORT, () => {
    console.log(
      `🚀 Server is running, GraphQL Playground available at http://localhost:${PORT}/graphql`
    );
  });
}

main(); // actually run the async function

// import typeDefs from "./graphql/typeDefs.js"
// import resolvers from "./resolvers/index.js"

// import mongoose from "mongoose";

// const server = new ApolloServer({ typeDefs, resolvers, context: ({req}) => {req} });

// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("MongoDb connected...");
//   })
//   .catch(() => {
//     console.log("Failed to connect to Mongo");
//   });

// server.listen({ port: 8000 || process.env.PORT }).then(({ url }) => {
//   console.log(`Server running on port ${url}`);
// });
