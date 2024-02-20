import { createReducer, on } from "@ngrx/store";

import { setSearch, setSidenav, toggleFavorite } from "./app.actions";

export const APP_FEATURE_KEY = "app";

export interface AppState {
    favorites: number[];
    isSidenavOpen: boolean;
    search: string;
}

export const initialState: AppState = {
    favorites: [],
    isSidenavOpen: false,
    search: "",
};

export const appReducer = createReducer(
    initialState,
    on(setSidenav, (state, { open }) => ({
        ...state,
        isSidenavOpen: open,
    })),
    on(setSearch, (state, { search }) => ({
        ...state,
        search,
    })),
    on(toggleFavorite, (state, { id }) => {
        const favorites = state.favorites.includes(id)
            ? state.favorites.filter((favorite) => favorite !== id)
            : [...state.favorites, id];

        return {
            ...state,
            favorites,
        };
    }),
);
