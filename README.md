# Test Technique Plus que Pro Laravel / React

## Installation

- Avoir docker et docker compose installé

- Copier le fichier `.env.example` en `.env`

- Mettre dans le .env la variable d'environnement TMDB_API_KEY

- Executer la commande `./vendor/bin/sail up`

- Executer la commande `./vendor/bin/sail composer install`

- Executer la commande `./vendor/bin/sail npm install`

- Executer la commande `./vendor/bin/sail artisan migrate`

- Executer la commande `./vendor/bin/sail npm run build

- Executer la commande `./vendor/bin/sail artisan app:update-trending-movies`

Avec le paramètre --all pour récupérer tous les films "trending" de TMDB
Avec le paramètre --max-pages=X pour limiter le nombre de pages à récupérer (10 par défaut)
Avec le paramètre --timeWindow=day ou --timeWindow=week pour récupérer les films "trending" par jour ou par semaine

Pour se connecter créer un compte via l'interface et vous connecter

## Ressources

J'ai utilisé les ressources suivantes pour réaliser ce test technique :

Inertia pour le lien avec Laravel
Flowbite pour le design
Laravel Breeze comme starter kit

- [TMDB](https://www.themoviedb.org/)
- [Laravel](https://laravel.com/docs/11)
- [React](https://react.dev/learn)
- [Inertia](https://inertiajs.com/getting-started)
- [Tailwind](https://tailwindcss.com/docs/guides/laravel)
- [Flowbite](https://flowbite.com/blocks/)
- [Laravel Breeze](https://laravel.com/docs/11/starter-kits#laravel-breeze)