// Import necessary types
import {PantryItem} from './grocery'; // Assuming you have these types defined
import {Recipe} from './index' ;

// Function to extract ingredients from recipe and compare with pantry list
export const generateGrocery = (recipes: Recipe[], pantry: PantryItem[]):PantryItem[] => {
  let groceryList: PantryItem[] = [];

  // Extract ingredients from each recipe and compare with pantry
  recipes.forEach(recipe => {
    recipe.ingredients.forEach( ingredient => {
      // If the ingredient is not in the pantry, add it to the grocery list
      if (!pantry.find(pantryItem => pantryItem.name === ingredient.name)) {
        groceryList.push({ name: ingredient.name }); // Correctly create a PantryItem object
      }
    });
  });



//   export const generateGroceryList = (recipes, pantry) => {
//     const groceryList = [];
  
//     recipes.forEach(recipe => {
//       recipe.ingredients.forEach(ingredient => {
//         if (!pantry.includes(ingredient.name)) {
//           groceryList.push(ingredient.name);
//         }
//       });
//     });


  return groceryList;
};
