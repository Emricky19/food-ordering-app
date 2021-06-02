import { ApolloServer, gql } from "apollo-server";

const typeDefs = `
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
    Query: {
      books: () => books,
    },
  };


const main = async () => {
  const server = new ApolloServer({typeDefs, resolvers});

  const { url } = await server.listen(3000);

  console.log(`🚀 Server ready at ${url}`);
};


main()