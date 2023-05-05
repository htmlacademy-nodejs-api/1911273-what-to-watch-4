import { User } from './user.type';
import { Genre } from './genre.enum';

type Background = {
    image: string,
    color: string
}

export type Film = {
    title: string;
    description: string;
    releaseDate: Date;
    genre: Genre;
    year: number;
    rating: number;
    preview: string;
    video: string;
    actors: string[];
    director: string;
    duration: number;
    commentsCount: number;
    user: User;
    poster: string;
    background: Background;
}
