import { Link } from '@inertiajs/react';
import { Movie } from '@/types';

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
            <div className="h-56 w-full">
                <Link href={route('movie.details', { id: movie.id })}>
                    <img className="mx-auto h-full"
                        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="" />
                </Link>
            </div>
            <div className="pt-6">
                <Link href={route('movie.details', { id: movie.id })}
                    className="text-lg font-semibold leading-tight text-gray-900 hover:underline ">{movie.title}</Link>
                <p className="text-gray-500 line-clamp-3">{movie.overview}</p>

                <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center">
                            <svg className="h-8 w-8 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                            </svg>
                        </div>

                        <p className="text-2xl font-medium text-gray-900">{movie.vote_average}</p>
                        <p className="text-2xl font-medium text-gray-500">({movie.vote_count})</p>
                    </div>
                    <Link
                        href={route('movie.details', { id: movie.id })}
                        className="inline-flex items-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4  focus:ring-blue-300"
                    >
                        <svg className="h-5 w-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}
