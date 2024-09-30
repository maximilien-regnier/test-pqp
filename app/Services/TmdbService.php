<?php

namespace App\Services;

use App\Enums\TmdbTimeWindows;
use App\Models\Movie;
use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class TmdbService
{
    /**
     * @throws Exception
     */
    public function storeTrendingMoviesByWeek(bool $all = false, int $maxPages = 10): void
    {
        $this->storeTrendingMovies(TmdbTimeWindows::WEEK, $all, $maxPages);
    }

    /**
     * @throws Exception
     */
    private function storeTrendingMovies(TmdbTimeWindows $timeWindow, bool $all = false, int $maxPages = 10): void
    {
        Movie::truncate();

        $page = 1;
        $totalPages = $maxPages;

        while ($page <= $totalPages) {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('tmdb.api_key'),
                'Content-Type' => 'application/json',
            ])->get('https://api.themoviedb.org/3/trending/movie/' . $timeWindow->value, [
                'language' => 'en-US',
                'page' => $page,
            ])->json();

            if ($all) {
                $totalPages = $response['total_pages'];
            }
            $page++;

            foreach ($response['results'] as $movie) {
                Movie::create([
                    'tmdb_id' => $movie['id'],
                    'title' => $movie['title'],
                    'original_title' => $movie['original_title'],
                    'original_language' => $movie['original_language'],
                    'poster_path' => $movie['poster_path'],
                    'backdrop_path' => $movie['backdrop_path'],
                    'adult' => $movie['adult'],
                    'overview' => $movie['overview'],
                    'release_date' => $movie['release_date'],
                    'popularity' => $movie['popularity'],
                    'vote_average' => $movie['vote_average'],
                    'vote_count' => $movie['vote_count'],
                    'media_type' => $movie['media_type'],
                    'genre_ids' => $movie['genre_ids'],
                ]);
            }
        }
    }

    /**
     * @throws Exception
     */
    public function storeTrendingMoviesByDay(bool $all = false, int $maxPages = 10): void
    {
        $this->storeTrendingMovies(TmdbTimeWindows::DAY, $all, $maxPages);
    }

    /**
     * @throws ConnectionException
     */
    public function getMovieGenres(): array
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . config('tmdb.api_key'),
            'Content-Type' => 'application/json',
        ])->get('https://api.themoviedb.org/3/genre/movie/list', [
            'language' => 'en',
        ])->json();
    }

    /** 
     * @throws ConnectionException
     */
    public function getAndStoreMovieDetails(int $id): Movie
    {
        $movie = Movie::findOrFail($id);

        if ($this->movieNeedsDetails($movie)) {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('tmdb.api_key'),
                'Content-Type' => 'application/json',
            ])->get('https://api.themoviedb.org/3/movie/' . $movie->tmdb_id, [
                'language' => 'en-US',
            ])->json();

            $movie->update([
                'belongs_to_collection' => $response['belongs_to_collection'] ?? null,
                'budget' => $response['budget'] ?? 0,
                'genres' => $response['genres'] ?? null,
                'homepage' => $response['homepage'] ?? null,
                'imdb_id' => $response['imdb_id'] ?? null,
                'production_companies' => $response['production_companies'] ?? null,
                'production_countries' => $response['production_countries'] ?? null,
                'revenue' => $response['revenue'] ?? 0,
                'runtime' => $response['runtime'] ?? 0,
                'spoken_languages' => $response['spoken_languages'] ?? null,
                'status' => $response['status'] ?? null,
                'tagline' => $response['tagline'] ?? null,
            ]);

            $movie->save();
        }
        return $movie;
    }

    private function movieNeedsDetails(Movie $movie): bool
    {
        return $movie->budget === 0 ||
            $movie->revenue === 0 ||
            $movie->runtime === 0 ||
            $movie->genres === null ||
            $movie->production_companies === null;
    }
}
