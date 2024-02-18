import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideHttpClient, withFetch } from "@angular/common/http";
import {
    provideAngularQuery,
    QueryClient,
} from "@tanstack/angular-query-experimental";

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideAngularQuery(new QueryClient()),
        provideRouter(routes),
        // provideClientHydration(),
    ],
};
