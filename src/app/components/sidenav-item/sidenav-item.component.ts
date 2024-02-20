import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";

import { MenuIconComponent } from "@/icons/menu-icon.component";
import { StarIconComponent } from "@/icons/star-icon.component";

@Component({
    selector: "sidenav-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: "./sidenav-item.component.html",
    imports: [MenuIconComponent, StarIconComponent, RouterLink, NgClass],
})
export class SidenavItemComponent {
    public route = input("");
    public text = input("");
    public active = input(false);
}
