# Dumpling-Recipe-App

Method for Pantry function ( Shawnelle ):









Method for Recipes function ( Shuting ):
1. getRecipes() ; 
    inoput: string (foodname)  
    output: List<Recipe> ( recipes which contain this food)
2. matchRecipes();
    input:  List<Recipe> （recipes for all the food）, List<Food> （Foods in the pantry） ,List<Food> （ the Foodlist based the eating habit in profile）
    output: List<Recipe> 
3. void addRecipeToCart();
    input: Recipe ()
4. void deleteRecipeFromCart();
    input: string ( recipeId)
5. getRecipesFoods();
    input: List<Recipe> (new recipes list after matching)
    output: List<Food> (a set of foods from all the recipes int the list)


Method for Grocery List function ( Yingying ):
