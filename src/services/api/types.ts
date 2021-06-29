import { Method } from 'axios';

export interface ApiConfig {
  url: string;
  method?: Method;
}
