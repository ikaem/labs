import { OS } from '../modules/os';

export const ROUTES: {
  path: string;
  component: React.FC;
}[] = [{ path: '/home', component: OS }];

export const USER = {
  username: 'borgoth@mordos.com',
  password: '12bindthem',
};
