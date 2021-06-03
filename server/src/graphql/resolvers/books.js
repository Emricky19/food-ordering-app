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

const bookResolvers = {
  Query: {
    books: () => books,
  },
};

export default bookResolvers