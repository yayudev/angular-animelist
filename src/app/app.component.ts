import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { MainLayoutComponent } from "@/layouts/main-layout/main-layout.component";

@Component({
    selector: "app-root",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterOutlet, MainLayoutComponent],
    templateUrl: "./app.component.html",
})
export class AppComponent {}
