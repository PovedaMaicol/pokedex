import { configureStore } from "@reduxjs/toolkit";
import trainerName from "./slices/trainerName.slice.js";
import pokemonName from "./slices/pokemonName.js";

const store = configureStore({
    reducer: {
        // los slices
        trainerName,
        pokemonName,
    }
});

export default store;