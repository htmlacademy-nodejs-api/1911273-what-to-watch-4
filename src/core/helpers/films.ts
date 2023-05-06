import {Film} from '../../types/film.type.js';
import {Genre} from '../../types/genre.enum.js';

export const createFilm = (filmData: string): Film => {
  const [
    userName, email, avatarPath, title, description, releaseDate, genre, year, rating, preview, video, actors, director, duration, commentsCount, poster, backgroundImage, backgroundColor
  ] = filmData.replace('\n', '').split('\t');

  const user = {
    name: userName, email, avatarPath
  };

  return {
    title,
    description,
    releaseDate: new Date(releaseDate),
    genre: Genre[genre as keyof typeof Genre],
    year: +year,
    rating: +rating,
    preview,
    video,
    actors: actors.split(','),
    director,
    duration: +duration,
    commentsCount: +commentsCount,
    poster,
    background: {
      image: backgroundImage,
      color: backgroundColor
    },
    user,
  } as Film;
};
