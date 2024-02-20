export type RawAnimeSeries = {
    mal_id: number;
    images: {
        jpg: {
            image_url: string;
            large_image_url: string;
        };
        webp: {
            image_url: string;
            large_image_url: string;
        };
    };
    trailer: {
        youtube_id: string;
        url: string;
        embed_url: string;
        images: {
            image_url: string;
        };
    };
    title: string;
    title_english: string;
    title_japanese: string;
    type: "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music";
    episodes: number;
    status: "Finished Airing" | "Currently Airing" | "Not yet aired";
    airing: boolean;
    synopsis: string;
    score: number;
    year: number;
};

export type AnimeSeries = {
    id: number;
    image: string;
    large_image: string;
    trailerId: string;
    title: string;
    title_english: string;
    title_japanese: string;
    score: number;
    type: "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music";
    episodes: number;
    status: "Finished Airing" | "Currently Airing" | "Not yet aired";
    airing: boolean;
    synopsis: string;
    year: number;
};
