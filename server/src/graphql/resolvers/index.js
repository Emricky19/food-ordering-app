import mealResolvers from "./meals.js"
import bookResolvers from "./books.js"

const resolvers = {
    Query: {
        ...mealResolvers.Query,
        ...bookResolvers.Query
    }
}

export default resolvers