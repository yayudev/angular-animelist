import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { injectQuery } from "@tanstack/angular-query-experimental";

import { JikanService } from "../../services/jikan.service";
import { selectFavorites, selectSearch } from "../../store/app.selectors";

import { AnimeSeriesItemComponent } from "../../components/anime-series-item/anime-series-item.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";

@Component({
    selector: "page-favorites",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        AnimeSeriesItemComponent,
        SpinnerComponent,
        SearchInputComponent,
        FormsModule,
    ],
    providers: [JikanService],
    templateUrl: "./favorites-page.component.html",
    styles: ":host { min-width: 100%; }",
})
export class FavoritesPageComponent {
    public animeSeasonsService = inject(JikanService);
    public store = inject(Store);

    public query = injectQuery(() => ({
        queryKey: ["current-season"],
        queryFn: () => this.animeSeasonsService.getCurrentSeason(),
    }));

    public searchValue = this.store.selectSignal(selectSearch);
    public favorites = this.store.selectSignal(selectFavorites);

    public displayedAnime = computed(() => {
        const searchValue = this.searchValue().toLowerCase();
        const animeList = this.query.data() || [];

        if (searchValue) {
            return animeList.filter((anime) =>
                anime.title.toLowerCase().includes(searchValue),
            );
        }

        return animeList.filter((anime) => this.favorites().includes(anime.id));
    });
}
