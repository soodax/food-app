import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        favouriteRecipes: [],
        idCount: 1
    },
    reducers: {
        addFavouriteRecipe(state, action) {
            state.favouriteRecipes.push({
                id: state.idCount,
                recipe: action.payload.item
            })
            state.idCount++;
        },
        removeFavouriteRecipe(state, action) {
            state.favouriteRecipes = state.favouriteRecipes
                .filter(item => item.recipe.recipe.label !== action.payload.item.recipe.label)
        }
    }
})

export const { addFavouriteRecipe, removeFavouriteRecipe } = mainSlice.actions;

export default mainSlice.reducer