import { createReducer, on } from "@ngrx/store";
import { setSearch, setSidenav } from "./app.actions";
import { toggleFavorite } from "./app.actions";

export const APP_FEATURE_KEY = "app";

export interface AppState {
    isSidenavOpen: boolean;
    search: string;
    favorites: number[];
}

export const initialState: AppState = {
    isSidenavOpen: false,
    search: "",
    favorites: [],
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
