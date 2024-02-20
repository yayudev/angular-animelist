import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "spinner",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: "./spinner.component.html",
})
export class SpinnerComponent {}
