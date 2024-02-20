import { createAction, props } from "@ngrx/store";

export const setSidenav = createAction(
    "[App] Set sidenav",
    props<{ open: boolean }>(),
);

export const setSearch = createAction(
    "[App] Set search",
    props<{ search: string }>(),
);

export const toggleFavorite = createAction(
    "[App] Toggle favorite",
    props<{ id: number }>(),
);
