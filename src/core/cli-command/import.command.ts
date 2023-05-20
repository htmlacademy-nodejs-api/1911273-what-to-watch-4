import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import {createFilm, getErrorMessage, getMongoURI} from '../helpers/index.js';
import {UserServiceInterface} from "../../modules/user/user-service.interface";
import {FilmServiceInterface} from "../../modules/film/film-service.inteface";
import {DatabaseClientInterface} from "../database-client/database-client.interface";
import {LoggerInterface} from "../logger/logger.interface";
import ConsoleLoggerService from "../logger/console.service.js";
import FilmService from "../../modules/film/film.service.js";
import {FilmModel} from "../../modules/film/film.entity.js";
import UserService from "../../modules/user/user.service.js";
import {UserModel} from "../../modules/user/user.entity.js";
import MongoClientService from "../database-client/mongo-client.service.js";
import {Film} from "../../types/film.type";

const DEFAULT_DB_PORT = '27018';
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private filmService!: FilmServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.filmService = new FilmService(this.logger, FilmModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveFilm(film: Film) {
    const user = await this.userService.findOrCreate({
      ...film.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

      await this.filmService.create({
        ...film,
        user,
      });
    }

  private async onLine(line: string, resolve: () => void) {
    const film = createFilm(line);
    await this.saveFilm(film);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    console.log(uri);

    await this.databaseService.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
