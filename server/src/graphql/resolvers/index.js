import mealResolvers from "./meals.js"

import userResolvers from "./user.js"

const resolvers = {
    Query: {
        ...mealResolvers.Query,
        
    },
    Mutation: {
        ...userResolvers.Mutation
    }
}

export default resolvers