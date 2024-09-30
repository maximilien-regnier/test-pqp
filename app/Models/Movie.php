<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'adult',
        'backdrop_path',
        'tmdb_id',
        'title',
        'original_language',
        'original_title',
        'overview',
        'poster_path',
        'media_type',
        'genre_ids',
        'popularity',
        'release_date',
        'video',
        'vote_average',
        'vote_count',
        'belongs_to_collection',
        'budget',
        'genres',
        'homepage',
        'imdb_id',
        'production_companies',
        'production_countries',
        'revenue',
        'runtime',
        'spoken_languages',
        'status',
        'tagline',
    ];

    protected $casts = [
        'adult' => 'boolean',
        'video' => 'boolean',
        'genre_ids' => 'array', // Cast genre_ids as array
        'popularity' => 'float',
        'vote_average' => 'float',
        'release_date' => 'date',
        'genres' => 'array',
        'production_companies' => 'array',
        'production_countries' => 'array',
        'spoken_languages' => 'array',
        'budget' => 'integer',
        'revenue' => 'integer',
        'runtime' => 'integer',
    ];
}
