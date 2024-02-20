import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./pages/anime-list-page/anime-list-page.component").then(
                (m) => m.AnimeListPageComponent,
            ),
    },
    {
        path: "series/:seriesId",
        loadComponent: () =>
            import("./pages/series-page/series-page.component").then(
                (m) => m.SeriesPageComponent,
            ),
    },
    {
        path: "favorites",
        loadComponent: () =>
            import("./pages/favorites-page/favorites-page.component").then(
                (m) => m.FavoritesPageComponent,
            ),
        data: {
            favorites: true,
        },
    },
];
