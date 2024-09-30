import MovieCard from "@/Components/MovieCard";
import { useEffect, useRef } from "react";
import { Movie } from '@/types';

interface MoviesListProps {
    movies: Movie[];
    loading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
}

export default function MoviesList({ movies, loading, hasMore, onLoadMore }: MoviesListProps) {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastMovieElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                onLoadMore();
            }
        });

        if (lastMovieElementRef.current) {
            observer.current.observe(lastMovieElementRef.current);
        }
    }, [loading, hasMore]);

    return (
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-3 px-10">
            {movies.map((movie: Movie, index: number) => (
                <div key={movie.id} ref={index === movies.length - 1 ? lastMovieElementRef : null}>
                    <MovieCard movie={movie} />
                </div>
            ))}
            {loading && <p className="text-center col-span-full">Films en cours de chargement...</p>}
            {!hasMore && movies.length > 0 && (
                <p className="text-center col-span-full">Plus de films à charger.</p>
            )}
        </div>
    )
}
