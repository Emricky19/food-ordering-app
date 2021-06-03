import React from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
// import Item from "../../model/Item"

import { useQuery, gql } from "@apollo/client";

import classes from "./AvailableMeals.module.css";

interface MealInterface {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface MealsDataInterface {
  meals: MealInterface[];
}

const AVAILABLE_MEALS = gql`
  query FetchMeals {
    meals {
      id
      name
      description
      price
    }
  }
`;
const AvailableMeals = () => {
  const { loading, data } = useQuery<MealsDataInterface>(AVAILABLE_MEALS);

  let mealsList;

  if (loading) return <p>Loading...</p>;

  mealsList = data?.meals.map((meal: MealInterface) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
