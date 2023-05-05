import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Film } from '../../types/film.type.js';
import { Genre } from '../../types/genre.enum.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([userName, email, avatarPath, title, description, releaseDate, genre, year, rating, preview, video, actors, director, duration, commentsCount, poster, backgroundImage, backgroundColor]) => ({
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
        user: {name: userName, email, avatarPath},
      }));
  }
}
