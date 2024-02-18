import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import(
                "./features/season/pages/season-page/season-page.component"
            ).then((m) => m.SeasonPageComponent),
    },
];
