import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MoviesList from '@/Components/MoviesList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MoviesResponse } from '@/types';

export default function SearchMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const searchMovies = async (page = 1) => {
        if (query.trim() === '') {
            setMovies([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get<MoviesResponse>(`/api/search-movies?query=${query}&page=${page}`);
            if (page === 1) {
                setMovies(response.data.data);
            } else {
                setMovies((prevMovies) => [...prevMovies, ...response.data.data]);
            }
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error searching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchMovies();
    }, [query]);

    const loadMoreMovies = () => {
        if (currentPage < lastPage) {
            searchMovies(currentPage + 1);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Search Movies
                </h2>
            }
        >
            <Head title="Search Movies" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <MoviesList
                        movies={movies}
                        loading={loading}
                        hasMore={currentPage < lastPage}
                        onLoadMore={loadMoreMovies}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}