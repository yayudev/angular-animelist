import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";

import type { AnimeSeries } from "@/types";

@Component({
    selector: "anime-series-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, NgOptimizedImage],
    templateUrl: "./anime-series-item.component.html",
})
export class AnimeSeriesItemComponent {
    public series = input.required<AnimeSeries>();

    public readonly seriesId = computed(() => this.series().id);
    public readonly title = computed(() => this.series().title);
    public readonly image = computed(() => this.series().image);
}
