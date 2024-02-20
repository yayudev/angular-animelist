import { inject, Injectable } from "@angular/core";
import { AnimeSeries, RawAnimeSeries } from "../types/anime.model";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map, timeout } from "rxjs";
import { injectQuery } from "@tanstack/angular-query-experimental";

@Injectable({
    providedIn: "root",
})
export class JikanService {
    private readonly http = inject(HttpClient);

    private readonly seasonsUrl = "https://api.jikan.moe/v4/seasons/now";
    private readonly seriesSingleUrl = "https://api.jikan.moe/v4/anime/{id}";

    public getCurrentSeason() {
        return lastValueFrom(
            this.http.get<{ data: RawAnimeSeries[] }>(this.seasonsUrl).pipe(
                timeout(5000),
                map((response) => {
                    return response.data.map((series) =>
                        mapResponseToAnimeList(series),
                    );
                }),
            ),
        );
    }

    public getSeriesById(id: string) {
        const endpoint = this.seriesSingleUrl.replace("{id}", id);

        return lastValueFrom(
            this.http.get<{ data: RawAnimeSeries }>(endpoint).pipe(
                timeout(5000),
                map((response) => mapResponseToAnimeList(response.data)),
            ),
        );
    }
}

export function injectQueryForAnimeSeason() {
    const jikanService = inject(JikanService);

    return injectQuery(() => ({
        queryKey: ["current-season"],
        queryFn: () => jikanService.getCurrentSeason(),
    }));
}

function mapResponseToAnimeList(rawSeries: RawAnimeSeries): AnimeSeries {
    return {
        id: rawSeries.mal_id,
        image: rawSeries.images.webp.image_url,
        large_image: rawSeries.images.webp.large_image_url,
        trailerId: rawSeries.trailer.youtube_id,
        title: rawSeries.title,
        title_english: rawSeries.title_english,
        title_japanese: rawSeries.title_japanese,
        type: rawSeries.type,
        score: rawSeries.score,
        episodes: rawSeries.episodes,
        status: rawSeries.status,
        airing: rawSeries.airing,
        synopsis: rawSeries.synopsis,
        year: rawSeries.year,
    };
}
