import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { SidenavItemComponent } from "../sidenav-item/sidenav-item.component";

@Component({
    selector: "sidenav-desktop",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: "./sidenav-desktop.component.html",
    imports: [SidenavItemComponent],
})
export class SidenavDesktopComponent {
    public items = input<{ route: string; name: string }[]>([]);
    public activeRoute = input<string | undefined>("");
}
