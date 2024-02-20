import {
    ChangeDetectionStrategy,
    Component,
    input,
    signal,
} from "@angular/core";
import { NgClass } from "@angular/common";
import { MinimizeIconComponent } from "../../icons/minimize-icon.component";
import { ExpandIconComponent } from "../../icons/expand-icon.component";

@Component({
    selector: "ui-expandable-section",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, ExpandIconComponent, MinimizeIconComponent],
    templateUrl: "./expandable-section.component.html",
})
export class ExpandableSectionComponent {
    public title = input<string>();

    public expanded = signal(false);

    public toggle() {
        this.expanded.update((expanded) => !expanded);
    }
}
