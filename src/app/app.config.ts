import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withFetch } from "@angular/common/http";
import {
    provideAngularQuery,
    QueryClient,
} from "@tanstack/angular-query-experimental";
import { ActionReducer, MetaReducer, provideStore } from "@ngrx/store";
import { APP_FEATURE_KEY, appReducer } from "./store/app.reducer";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
    localStorageSync,
    rehydrateApplicationState,
} from "ngrx-store-localstorage";

export function localStorageSyncReducer(
    reducer: ActionReducer<any>,
): ActionReducer<any> {
    return localStorageSync({ keys: [APP_FEATURE_KEY], rehydrate: true })(
        reducer,
    );
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes),
        provideAnimations(),
        provideAngularQuery(new QueryClient()),
        provideStore(
            {
                app: appReducer,
            },
            {
                metaReducers: [localStorageSyncReducer],
            },
        ),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    ],
};
