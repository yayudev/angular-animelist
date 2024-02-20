import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./pages/season-page/season-page.component").then(
                (m) => m.SeasonPageComponent,
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
            import("./pages/season-page/season-page.component").then(
                (m) => m.SeasonPageComponent,
            ),
        data: {
            favorites: true,
        },
    },
];
