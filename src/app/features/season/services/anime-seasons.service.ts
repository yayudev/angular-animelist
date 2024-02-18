import { inject, Injectable } from "@angular/core";
import { AnimeSeries, RawAnimeSeries } from "../../../shared/types/anime.model";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map, timeout } from "rxjs";
import { injectParams } from "ngxtension/inject-params";

export interface AnimeSeasonServerResponse {
    pagination: {
        current_page: number;
        has_next_page: boolean;
        items: {
            per_page: number;
            total: number;
            count: number;
        };
    };
    data: Array<RawAnimeSeries>;
}

@Injectable()
export class AnimeSeasonsService {
    private readonly http = inject(HttpClient);

    private readonly seasonsUrl = "https://api.jikan.moe/v4/seasons/now";

    public getCurrentSeason() {
        return lastValueFrom(
            this.http
                .get<AnimeSeasonServerResponse>(this.seasonsUrl)
                .pipe(timeout(5000), map(mapResponseToAnimeList)),
        );
    }
}

function mapResponseToAnimeList(
    response: AnimeSeasonServerResponse,
): AnimeSeries[] {
    return response.data.map((rawSeries) => ({
        id: rawSeries.mal_id,
        image: rawSeries.images.jpg.image_url,
        trailer: rawSeries.trailer.embed_url,
        title: rawSeries.title,
        title_english: rawSeries.title_english,
        title_japanese: rawSeries.title_japanese,
        type: rawSeries.type,
        episodes: rawSeries.episodes,
        status: rawSeries.status,
        airing: rawSeries.airing,
        synopsis: rawSeries.synopsis,
        year: rawSeries.year,
    }));
}
