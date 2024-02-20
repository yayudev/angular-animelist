import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from "@angular/core";
import { StarIconComponent } from "@/icons/star-icon.component";

@Component({
    selector: "review-score",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: "./review-score.component.html",
    imports: [StarIconComponent],
})
export class ReviewScoreComponent {
    public score = input(0);

    private readonly scoreInStars = computed(() => {
        return Math.round(this.score() / 2);
    });

    public readonly positiveStars = computed(() => {
        return Array.from({ length: this.scoreInStars() });
    });

    public readonly negativeStars = computed(() => {
        return Array.from({ length: 5 - this.scoreInStars() });
    });
}
