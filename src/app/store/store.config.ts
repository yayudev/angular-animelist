import { isDevMode } from "@angular/core";
import { ActionReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";

import { APP_FEATURE_KEY, appReducer } from "./app";

export type StoreState = {
    [APP_FEATURE_KEY]: ReturnType<typeof appReducer>;
};

export const reducers = {
    [APP_FEATURE_KEY]: appReducer,
};

export const storeConfig = {
    metaReducers: [localStorageSyncReducer],
};

export const storeDevToolsConfig = {
    maxAge: 25,
    logOnly: !isDevMode(),
};

export function localStorageSyncReducer(
    reducer: ActionReducer<StoreState>,
): ActionReducer<StoreState> {
    return localStorageSync({ keys: [APP_FEATURE_KEY], rehydrate: true })(
        reducer,
    );
}
