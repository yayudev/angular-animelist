import { ApplicationConfig } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch } from "@angular/common/http";

import {
    provideAngularQuery,
    QueryClient,
} from "@tanstack/angular-query-experimental";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideAnimations } from "@angular/platform-browser/animations";

import {
    reducers,
    storeConfig,
    storeDevToolsConfig,
} from "./store/store.config";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes),
        provideAnimations(),
        provideAngularQuery(new QueryClient()),
        provideStore(reducers, storeConfig),
        provideStoreDevtools(storeDevToolsConfig),
        provideClientHydration(),
    ],
};
