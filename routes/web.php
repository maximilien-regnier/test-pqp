<?php

use App\Http\Controllers\ProfileController;
use App\Models\Movie;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MoviesController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/trending-movies', [MoviesController::class, 'trendingMoviesPage'])
    ->middleware(['auth', 'verified'])->name('trending-movies');

Route::get('/api/trending-movies', [MoviesController::class, 'trendingMovies'])
    ->middleware(['auth', 'verified']);

Route::get('/search-movies', [MoviesController::class, 'searchMoviesPage'])
    ->middleware(['auth', 'verified'])->name('search-movies');

Route::get('/api/search-movies', [MoviesController::class, 'searchMovies'])
    ->middleware(['auth', 'verified']);

Route::get('/movie/{id}', [MoviesController::class, 'movieDetails'])
    ->middleware(['auth', 'verified'])->name('movie.details');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
