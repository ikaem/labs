import { OS } from '../modules/os';

export const ROUTES: {
  path: string;
  component: React.FC;
}[] = [{ path: '/home', component: OS }];

export const USER = {
  username: 'karlo ',
  password: 'karlo',
};

export const VALID_FILE_FOLDER_NAME_EXPRESSION = new RegExp(/^[a-zA-Z].*/);

export enum localStorageKeys {
  FILESYSTEM = 'filesystem',
  AUTH = 'auth',
}
