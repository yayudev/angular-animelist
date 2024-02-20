import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
} from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { JikanService } from "../../services/jikan.service";
import { AnimeSeriesItemComponent } from "../../components/anime-series-item/anime-series-item.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { selectFavorites, selectSearch } from "../../store/app.selectors";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "page-season",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        AnimeSeriesItemComponent,
        SpinnerComponent,
        SearchInputComponent,
        FormsModule,
    ],
    providers: [JikanService],
    templateUrl: "./season-page.component.html",
    styles: ":host { min-width: 100%; }",
})
export class SeasonPageComponent {
    public animeSeasonsService = inject(JikanService);
    public store = inject(Store);
    public router = inject(Router);
    public activatedRoute = inject(ActivatedRoute);

    public onlyFavorites = toSignal(
        this.activatedRoute.data.pipe(
            map((data) => (data as any).favorites as boolean | undefined),
        ),
        { initialValue: false },
    );

    public favorites = this.store.selectSignal(selectFavorites);

    public query = injectQuery(() => ({
        queryKey: ["current-season"],
        queryFn: () => this.animeSeasonsService.getCurrentSeason(),
    }));

    public searchValue = this.store.selectSignal(selectSearch);

    public displayedAnime = computed(() => {
        const searchValue = this.searchValue().toLowerCase();
        let animeList = this.query.data() || [];

        if (this.onlyFavorites()) {
            animeList = animeList.filter((anime) =>
                this.favorites().includes(anime.id),
            );
        }

        if (searchValue) {
            return animeList.filter((anime) =>
                anime.title.toLowerCase().includes(searchValue),
            );
        }

        return animeList;
    });
}
