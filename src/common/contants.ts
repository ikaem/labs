// TODO remove
// import { RouteComponentProps } from '@reach/router';
import { OS } from '../modules/os';

export const ROUTES: {
  path: string;
  component: React.FC;
}[] = [{ path: '/home', component: OS }];
