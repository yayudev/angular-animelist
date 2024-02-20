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
import { selectSearch } from "@/store/app";

import { AnimeSeriesItemComponent } from "@/components/anime-series-item/anime-series-item.component";
import { SearchInputComponent } from "@/components/search-input/search-input.component";
import { SpinnerComponent } from "@/components/spinner/spinner.component";

@Component({
    selector: "anime-list-page",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        AnimeSeriesItemComponent,
        SpinnerComponent,
        SearchInputComponent,
        FormsModule,
    ],
    providers: [JikanService],
    templateUrl: "./anime-list-page.component.html",
    styles: ":host { min-width: 100%; }",
})
export class AnimeListPageComponent {
    public readonly animeSeasonsService = inject(JikanService);
    public readonly store = inject(Store);

    public readonly query = injectQuery(() => ({
        queryKey: ["current-season"],
        queryFn: () => this.animeSeasonsService.getCurrentSeason(),
    }));

    public readonly searchValue = this.store.selectSignal(selectSearch);

    public readonly displayedAnime = computed(() => {
        const searchValue = this.searchValue().toLowerCase();
        const animeList = this.query.data() || [];

        if (!searchValue) {
            return animeList;
        }

        return animeList.filter((anime) =>
            anime.title.toLowerCase().includes(searchValue),
        );
    });
}
