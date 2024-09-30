<?php

namespace App\Console\Commands;

use App\Enums\TmdbTimeWindows;
use App\Services\TmdbService;
use Exception;
use Illuminate\Console\Command;

class UpdateTrendingMovies extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-trending-movies {--timeWindow=day : Time window to get trending movies from TMDB} {--all : Get all movies from TMDB trending api}, {--max-pages=10 : Maximum number of pages to get from TMDB}';



    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(TmdbService $tmdbService): void
    {
        $this->info('Getting trending movies from TMDB...');

        $timeWindow = $this->option('timeWindow');
        $all = $this->option('all');
        $maxPages = $this->option('max-pages');


        try {
            switch ($timeWindow) {
                case TmdbTimeWindows::DAY->value:
                    $tmdbService->storeTrendingMoviesByDay($all, $maxPages);
                    break;
                case TmdbTimeWindows::WEEK->value:
                    $tmdbService->storeTrendingMoviesByWeek($all, $maxPages);
                    break;
                default:
                    $this->error('Invalid time window');
                    return;
            }
        } catch (Exception $e) {
            $this->error('Error getting trending movies from TMDB: ' . $e->getMessage());
            return;
        }

        $this->info('Command executed successfully.');
    }
}
