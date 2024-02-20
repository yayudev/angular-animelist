import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { setSearch, setSidenav, selectSearch } from "@/store/app";

import { SearchInputComponent } from "@/components/search-input/search-input.component";
import { SidenavComponent } from "@/components/sidenav/sidenav.component";
import { GithubIconComponent } from "@/icons/github-icon.component";
import { MenuIconComponent } from "@/icons/menu-icon.component";
import { SearchIconComponent } from "@/icons/search-icon.component";

@Component({
    selector: "app-main-layout",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MenuIconComponent,
        SearchIconComponent,
        SidenavComponent,
        SearchInputComponent,
        GithubIconComponent,
    ],
    templateUrl: "./main-layout.component.html",
})
export class MainLayoutComponent {
    private readonly store = inject(Store);
    private readonly router = inject(Router);

    public readonly searchValue = this.store.selectSignal(selectSearch);

    public openSidenav() {
        this.store.dispatch(setSidenav({ open: true }));
    }

    public onInputChange($event: Event) {
        const value = ($event.target as HTMLInputElement).value;

        this.store.dispatch(setSearch({ search: value }));

        this.router.navigate(["/"]);
    }
}
