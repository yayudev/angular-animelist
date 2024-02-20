import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { injectQuery } from "@tanstack/angular-query-experimental";

import { JikanService } from "@/services/jikan.service";
import { selectFavorites, selectSearch } from "@/store/app";

import { AnimeSeriesItemComponent } from "@/components/anime-series-item/anime-series-item.component";
import { SearchInputComponent } from "@/components/search-input/search-input.component";
import { SpinnerComponent } from "@/components/spinner/spinner.component";

@Component({
    selector: "favorites-page",
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
    private readonly animeSeasonsService = inject(JikanService);
    private readonly store = inject(Store);

    public readonly query = injectQuery(() => ({
        queryKey: ["current-season"],
        queryFn: () => this.animeSeasonsService.getCurrentSeason(),
    }));

    private readonly favorites = this.store.selectSignal(selectFavorites);
    public readonly searchValue = this.store.selectSignal(selectSearch);

    public readonly displayedAnime = computed(() => {
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
