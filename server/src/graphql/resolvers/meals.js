import { Meal } from "../../models/Meal.js";


const mealResolvers = {
  Query: {
    fetchMeals: async () => {
      try {
        const meals = await Meal.find();
        return meals;
      } catch (error) {
          throw new Error(error)
      }
    },
  },
};

export default mealResolvers;
