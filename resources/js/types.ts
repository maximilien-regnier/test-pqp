export interface Movie {
    id: number;
    title: string;
    original_title: string;
    original_language: string;
    poster_path: string;
    backdrop_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    media_type: string;
    genre_ids: number[];
}

export interface MoviesResponse {
    data: Movie[];
    current_page: number;
    last_page: number;
}