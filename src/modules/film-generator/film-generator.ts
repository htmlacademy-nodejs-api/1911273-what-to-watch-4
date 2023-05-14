import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../core/helpers/index.js';
import {FilmGeneratorInterface} from './film-generator.interface';
import {User} from '../../types/user.type';
import {Background} from '../../types/film.type';

const MIN_COMMENTS = 1;
const MAX_COMMENTS = 30;

export default class FilmGenerator implements FilmGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const releaseDate = getRandomItem<Date>(this.mockData.releaseDates);
    const genre = getRandomItems<string>(this.mockData.genres).join(', ');
    const year = getRandomItem<number>(this.mockData.years);
    const rating = getRandomItem<number>(this.mockData.ratings);
    const preview = getRandomItem<string>(this.mockData.previews);
    const video = getRandomItem<string>(this.mockData.videos);
    const actors = getRandomItem<string[]>(this.mockData.actorsList);
    const director = getRandomItem<string>(this.mockData.directors);
    const duration = getRandomItem<number>(this.mockData.durations);
    const commentsCount = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    const user = getRandomItem<User>(this.mockData.users);
    const poster = getRandomItem<string>(this.mockData.posters);
    const background = getRandomItem<Background>(this.mockData.backgrounds);

    const {image: backgroundImage, color: backgroundColor} = background;
    const {name: userName, email, avatarPath} = user;

    return [
      title, description, releaseDate,
      genre, year, rating,
      preview, video, actors,
      director, duration, commentsCount,
      poster, backgroundImage, backgroundColor, userName, email, avatarPath
    ].join('\t');
  }
}
