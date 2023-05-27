import {DocumentType} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import CreateFilmDto from "./dto/create-film.dto";

export interface FilmServiceInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
}
