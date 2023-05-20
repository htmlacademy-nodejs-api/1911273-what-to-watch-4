import {User} from "../../../types/user.type";
import {Background} from "../../../types/film.type";

export default class CreateFilmDto {
  public title!: string;
  public description!: string;
  public releaseDate!: Date;
  public genre!: string;
  public year!: number;
  public rating!: number;
  public preview!: string;
  public video!: string;
  public actors!: string[];
  public director!: string;
  public duration!: number;
  public commentsCount!: number;
  public user!: User;
  public poster!: string;
  public background!: Background;
}
