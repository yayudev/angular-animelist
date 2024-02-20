import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from "@angular/core";
import { StarIconComponent } from "../../icons/star-icon.component";

@Component({
    selector: "review-score",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: "./review-score.component.html",
    imports: [StarIconComponent],
})
export class ReviewScoreComponent {
    public score = input(0);

    private scoreInStars = computed(() => {
        return Math.round(this.score() / 2);
    });

    public positiveStars = computed(() => {
        return Array.from({ length: this.scoreInStars() });
    });

    public negativeStars = computed(() => {
        return Array.from({ length: 5 - this.scoreInStars() });
    });
}
