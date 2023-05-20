import {Film} from '../../types/film.type.js';

export const createFilm = (filmData: string): Film => {
  const [
    title, description, releaseDate, genre, year, rating, preview, video, actors, director, duration, commentsCount, poster, backgroundImage, backgroundColor, username, email, avatarPath
  ] = filmData.replace('\n', '').split('\t');

  const user = {
    username, email, avatarPath
  };

  return {
    title,
    description,
    releaseDate: new Date(releaseDate),
    genre,
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
