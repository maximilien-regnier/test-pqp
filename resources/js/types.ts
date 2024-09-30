export interface Movie {
    id: number;
    adult: boolean;
    backdrop_path: string | null;
    tmdb_id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string | null;
    poster_path: string | null;
    media_type: string | null;
    genre_ids: number[];
    popularity: number;
    release_date: string | null;
    video: boolean;
    vote_average: number;
    vote_count: number;
    belongs_to_collection: string | null;
    budget: number;
    genres_ids: number[];
    homepage: string | null;
    imdb_id: string | null;
    revenue: number;
    runtime: number | null;

    status: string;
    tagline: string | null;
}
export interface MoviesResponse {
    data: Movie[];
    current_page: number;
    last_page: number;
}