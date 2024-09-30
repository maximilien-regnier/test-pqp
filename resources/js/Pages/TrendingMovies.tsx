import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MoviesList from '@/Components/MoviesList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MoviesResponse } from '@/types';

export default function TrendingMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadMoreMovies = async () => {
        if (currentPage >= lastPage || loading) return;

        setLoading(true);
        const nextPage = currentPage + 1;

        try {
            const response = await axios.get<MoviesResponse>(`/api/trending-movies?page=${nextPage}`);
            setMovies((prevMovies) => [...prevMovies, ...response.data.data]);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error loading movies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMoreMovies();
    }, []); // Load initial movies on component mount

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Trending Movies
                </h2>
            }
        >
            <Head title="TrendingMovies" />
            <div className="py-12">
                <MoviesList
                    movies={movies}
                    loading={loading}
                    hasMore={currentPage < lastPage}
                    onLoadMore={loadMoreMovies}
                />
            </div>
        </AuthenticatedLayout>
    );
}
