// Import necessary types
import { Recipe, PantryItem } from './types'; // Assuming you have these types defined

// Function to extract ingredients from recipe and compare with pantry list
export const generateGroceryList = (recipes: Recipe[], pantry: PantryItem[]): string[] => {
  let groceryList: string[] = [];

  // Extract ingredients from each recipe and compare with pantry
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      // If the ingredient is not in the pantry, add it to the grocery list
      if (!pantry.find(pantryItem => pantryItem.name === ingredient.name)) {
        groceryList.push(ingredient.name);
      }
    });
  });

  return groceryList;
};
