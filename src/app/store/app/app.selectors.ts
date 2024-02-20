import { APP_FEATURE_KEY, AppState } from "./app.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

export const selectIsSidenavOpen = createSelector(
    selectAppState,
    (state) => state.isSidenavOpen,
);

export const selectSearch = createSelector(
    selectAppState,
    (state) => state.search,
);

export const selectFavorites = createSelector(
    selectAppState,
    (state) => state.favorites,
);

export const selectIsFavorite = (id: number) =>
    createSelector(selectFavorites, (favorites) => favorites.includes(id));
