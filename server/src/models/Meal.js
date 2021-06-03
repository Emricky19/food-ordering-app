import { Schema, model } from "mongoose";

const mealSchema = new Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
});

export const Meal = model('Meal', mealSchema);