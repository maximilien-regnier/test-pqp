import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Movie } from '@/types';

export default function MovieDetails({ movie }: { movie: Movie }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Movie Details
                </h2>
            }
        >
            <Head title={`${movie.title} - Movie Details`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full rounded-lg shadow-lg"
                                    />
                                </div>
                                <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
                                    <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                                    <p className="text-gray-600 mb-4">{movie.overview}</p>
                                    <p className="text-gray-500 italic mb-4">{movie.tagline}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoItem label="Release Date" value={movie.release_date} />
                                        <InfoItem label="Original Language" value={movie.original_language} />
                                        <InfoItem label="Original Title" value={movie.original_title} />
                                        <InfoItem label="Popularity" value={movie.popularity} />
                                        <InfoItem label="Vote Average" value={`${movie.vote_average} (${movie.vote_count} votes)`} />
                                        <InfoItem label="Adult" value={movie.adult ? 'Yes' : 'No'} />
                                        <InfoItem label="Video" value={movie.video ? 'Yes' : 'No'} />
                                        <InfoItem label="Budget" value={`$${movie.budget.toLocaleString()}`} />
                                        <InfoItem label="Revenue" value={`$${movie.revenue.toLocaleString()}`} />
                                        <InfoItem label="Runtime" value={`${movie.runtime} minutes`} />
                                        <InfoItem label="Status" value={movie.status} />
                                        <InfoItem label="Homepage" value={movie.homepage} />
                                        <InfoItem label="IMDB ID" value={movie.imdb_id} />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold mb-2">Production Companies</h3>
                                        <ul className="list-disc list-inside">
                                            {movie.production_companies.map((company: any) => (
                                                <li key={company.id}>{company.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold mb-2">Production Countries</h3>
                                        <ul className="list-disc list-inside">
                                            {movie.production_countries.map((country: any) => (
                                                <li key={country.iso_3166_1}>{country.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold mb-2">Spoken Languages</h3>
                                        <ul className="list-disc list-inside">
                                            {movie.spoken_languages.map((language: any) => (
                                                <li key={language.iso_639_1}>{language.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoItem({ label, value }: { label: string; value: string | number | null }) {
    return (
        <div>
            <p className="font-semibold">{label}:</p>
            <p>{value}</p>
        </div>
    );
}