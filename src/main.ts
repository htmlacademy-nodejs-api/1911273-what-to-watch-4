import 'reflect-metadata';
import { Container } from 'inversify';
import { AppComponent } from './types/app-component.enum.js';
import Application from "./app/rest.js";
import { createRestApplicationContainer } from './app/rest.container.js';
import { createUserContainer } from './modules/user/user.container.js';

const init = async () => {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
  );

  const application = mainContainer.get<Application>(AppComponent.Application);
  await application.init();
}

init();
