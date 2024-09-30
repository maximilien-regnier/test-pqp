<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMissingFieldsToMoviesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->string('belongs_to_collection')->nullable();
            $table->integer('budget')->default(0);
            $table->json('genres')->nullable();
            $table->string('homepage')->nullable();
            $table->string('imdb_id')->nullable();
            $table->json('production_companies')->nullable();
            $table->json('production_countries')->nullable();
            $table->integer('revenue')->default(0);
            $table->integer('runtime')->default(0);
            $table->json('spoken_languages')->nullable();
            $table->string('status')->nullable();
            $table->string('tagline')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn([
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
            ]);
        });
    }
}
