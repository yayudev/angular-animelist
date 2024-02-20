import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { AnimeSeries } from "../../types/anime.model";
import { NgOptimizedImage } from "@angular/common";

@Component({
    selector: "anime-series-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, NgOptimizedImage],
    templateUrl: "./anime-series-item.component.html",
})
export class AnimeSeriesItemComponent {
    public series = input.required<AnimeSeries>();

    public seriesId = computed(() => this.series().id);
    public title = computed(() => this.series().title);
    public image = computed(() => this.series().image);
}
