<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->boolean('adult')->default(true);
            $table->string('backdrop_path')->nullable();
            $table->integer('tmdb_id')->default(0);
            $table->string('title');
            $table->string('original_language');
            $table->string('original_title');
            $table->text('overview')->nullable();
            $table->string('poster_path')->nullable();
            $table->string('media_type')->nullable();
            $table->json('genre_ids');
            $table->float('popularity')->default(0);
            $table->date('release_date')->nullable();
            $table->boolean('video')->default(true);
            $table->float('vote_average')->default(0);
            $table->integer('vote_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
