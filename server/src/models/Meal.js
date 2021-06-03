import mongoose  from "mongoose";


const mealSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0.0,
  },
});

export const Meal = mongoose.model("Meal", mealSchema);
