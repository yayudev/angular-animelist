import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MenuIconComponent } from "../../icons/menu-icon.component";
import { SearchIconComponent } from "../../icons/search-icon.component";
import { SidenavComponent } from "../../components/sidenav/sidenav.component";
import { Store } from "@ngrx/store";
import { setSearch, setSidenav } from "../../store/app.actions";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { selectSearch } from "../../store/app.selectors";
import { GithubIconComponent } from "../../icons/github-icon.component";
import { Router } from "@angular/router";

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
    private router = inject(Router);

    public searchValue = this.store.selectSignal(selectSearch);

    public openSidenav() {
        console.log("hello");
        this.store.dispatch(setSidenav({ open: true }));
    }

    public onInputChange($event: Event) {
        const value = ($event.target as HTMLInputElement).value;

        this.store.dispatch(setSearch({ search: value }));

        this.router.navigate(["/"]);
    }
}
