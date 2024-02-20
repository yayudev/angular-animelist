import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { YouTubePlayer } from "@angular/youtube-player";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { injectParams } from "ngxtension/inject-params";
import { from, switchMap } from "rxjs";

import { JikanService } from "@/services/jikan.service";
import { toggleFavorite, selectIsFavorite } from "@/store/app";

import { ExpandableSectionComponent } from "@/components/expandable-section/expandable-section.component";
import { HeartIconComponent } from "@/icons/heart-icon.component";
import { ReviewScoreComponent } from "@/components/review-score/review-score.component";
import { SpinnerComponent } from "@/components/spinner/spinner.component";

@Component({
    selector: "page-series",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ExpandableSectionComponent,
        SpinnerComponent,
        YouTubePlayer,
        ReviewScoreComponent,
        NgOptimizedImage,
        HeartIconComponent,
    ],
    templateUrl: "./series-page.component.html",
    styles: [":host { width: 100%; }"],
})
export class SeriesPageComponent {
    public readonly store = inject(Store);
    public readonly jikanService = inject(JikanService);

    public readonly seriesId = injectParams("seriesId");
    public readonly seriesIdAsNumber = computed(() =>
        Number.parseInt(this.seriesId() as string, 10),
    );

    public readonly isFavorite$ = toObservable(this.seriesIdAsNumber).pipe(
        switchMap((id) => {
            if (!id) return from([false]);

            return this.store.select(selectIsFavorite(id));
        }),
    );
    public readonly isFavorite = toSignal(this.isFavorite$, {
        initialValue: false,
    });

    public readonly query = injectQuery(() => ({
        queryKey: ["series", this.seriesId()],
        queryFn: () =>
            this.jikanService.getSeriesById(this.seriesId() as string),
    }));

    public readonly series = computed(() => this.query.data());
    public readonly seriesScore = computed(() => this.series()?.score ?? 0);

    public toggleFavorite() {
        this.store.dispatch(toggleFavorite({ id: this.seriesIdAsNumber() }));
    }
}
