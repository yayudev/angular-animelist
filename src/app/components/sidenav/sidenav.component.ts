import { ChangeDetectionStrategy, Component } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { injectNavigationEnd } from "ngxtension/navigation-end";

import { SidenavDesktopComponent } from "../sidenav-desktop/sidenav-desktop.component";
import { SidenavMobileComponent } from "../sidenav-mobile/sidenav-mobile.component";

@Component({
    selector: "sidenav",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SidenavDesktopComponent, SidenavMobileComponent],
    templateUrl: "./sidenav.component.html",
})
export class SidenavComponent {
    public readonly routes = [
        { name: "Current season", route: "/" },
        { name: "Favorites", route: "/favorites" },
    ];

    public readonly activeRoute$ = injectNavigationEnd().pipe(
        map((event) => event.url),
    );
    public readonly activeRoute = toSignal(this.activeRoute$);
}
