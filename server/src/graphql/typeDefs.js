import { gql } from "apollo-server";

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }
    type Meal {
        id: String,
        name: String,
        description: String,
        price: Float,
    }
    type Query {
        books: [Book],
        meals: [Meal]
    }
`;

export default typeDefs;
