import { gql } from "apollo-server";

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }
    type Meal {
        id: ID!,
        name: String,
        description: String,
        price: Float,
    }
    type Query {
        books: [Book],
        fetchMeals: [Meal]
    }
`;

export default typeDefs;
