import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from "@angular/core";
import { SidenavDesktopComponent } from "../sidenav-desktop/sidenav-desktop.component";
import { SidenavMobileComponent } from "../sidenav-mobile/sidenav-mobile.component";
import { ActivatedRoute, Router } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { injectNavigationEnd } from "ngxtension/navigation-end";

@Component({
    selector: "sidenav",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SidenavDesktopComponent, SidenavMobileComponent],
    templateUrl: "./sidenav.component.html",
})
export class SidenavComponent {
    public navigationEnd$ = injectNavigationEnd();

    public readonly routes = [
        { name: "Current season", route: "/" },
        { name: "Favorites", route: "/favorites" },
    ];

    public activeRoute = toSignal(
        this.navigationEnd$.pipe(map((event) => event.url)),
    );
}
