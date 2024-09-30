<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Services\TmdbService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MoviesController extends Controller
{
    private TmdbService $tmdbService;

    public function __construct(TmdbService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    public function trendingMoviesPage()
    {
        return Inertia::render('TrendingMovies');
    }

    public function trendingMovies(Request $request)
    {
        $perPage = 12;
        $page = $request->input('page', 1);

        $movies = Movie::orderBy('popularity', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($movies);
    }

    public function searchMoviesPage()
    {
        return Inertia::render('SearchMovies');
    }

    public function searchMovies(Request $request)
    {
        $query = $request->input('query');
        $perPage = 12;
        $page = $request->input('page', 1);

        $movies = Movie::where('title', 'like', "%{$query}%")
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($movies);
    }

    public function movieDetails($id)
    {
        $movie = $this->tmdbService->getAndStoreMovieDetails($id);

        return Inertia::render('MovieDetails', [
            'movie' => $movie
        ]);
    }
}
