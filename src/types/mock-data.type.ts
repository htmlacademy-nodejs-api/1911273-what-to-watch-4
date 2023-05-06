import {User} from './user.type';
import {Background} from './film.type';

export type MockData = {
  titles: string[];
  descriptions: string[];
  releaseDates: Date[];
  genres: string[];
  years: number[];
  ratings: number[];
  previews: string[];
  videos: string[];
  actorsList: string[][];
  directors: string[];
  durations: number[];
  users: User[];
  posters: string[];
  backgrounds: Background[];
};
