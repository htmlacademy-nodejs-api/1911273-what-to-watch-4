import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import {Background} from "../../types/film.type";

const { prop, modelOptions } = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})
export class FilmEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public releaseDate!: Date;

  @prop({trim: true})
  public genre!: string;

  @prop()
  public year!: number;

  @prop()
  public rating!: number;

  @prop({trim: true})
  public preview!: string;

  @prop({trim: true})
  public video!: string;

  @prop()
  public actors!: string[];

  @prop({trim: true})
  public director!: string;

  @prop()
  public duration!: number;

  @prop({default: 0})
  public commentCount!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public user!: Ref<UserEntity>;

  @prop({trim: true})
  public poster!: string;

  @prop()
  public background!: Background;
}

export const FilmModel = getModelForClass(FilmEntity);
