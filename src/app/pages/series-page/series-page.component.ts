import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { YouTubePlayer } from "@angular/youtube-player";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { JikanService } from "../../services/jikan.service";
import { ExpandableSectionComponent } from "../../components/expandable-section/expandable-section.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { ReviewScoreComponent } from "../../components/review-score/review-score.component";
import { injectParams } from "ngxtension/inject-params";
import { HeartIconComponent } from "../../icons/heart-icon.component";
import { Store } from "@ngrx/store";
import { toggleFavorite } from "../../store/app.actions";
import { selectIsFavorite } from "../../store/app.selectors";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { from, switchMap } from "rxjs";

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
    public store = inject(Store);
    public jikanService = inject(JikanService);

    public seriesId = injectParams("seriesId");
    public seriesIdAsNumber = computed(() =>
        Number.parseInt(this.seriesId() as string, 10),
    );

    public isFavorite$ = toObservable(this.seriesIdAsNumber).pipe(
        switchMap((id) => {
            if (!id) return from([false]);

            return this.store.select(selectIsFavorite(id));
        }),
    );
    public isFavorite = toSignal(this.isFavorite$, { initialValue: false });

    public query = injectQuery(() => ({
        queryKey: ["series", this.seriesId()],
        queryFn: () =>
            this.jikanService.getSeriesById(this.seriesId() as string),
    }));

    public series = computed(() => this.query.data());
    public seriesScore = computed(() => this.series()?.score ?? 0);

    public toggleFavorite() {
        this.store.dispatch(toggleFavorite({ id: this.seriesIdAsNumber() }));
    }
}
