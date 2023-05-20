import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import {FilmServiceInterface} from "./film-service.inteface";
import {FilmEntity} from "./film.entity";
import CreateFilmDto from "./dto/create-film.dto";

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.title}`);

    return result;
  }

  public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findById(filmId).exec();
  }
}
