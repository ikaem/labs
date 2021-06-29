import { createApiCall } from '../api';
import { ApiConfig } from '../api/types';

export const fetchFeedArticles = async (url: string) => {
  const apiConfig: ApiConfig = {
    url,
  };

  const apiCall = createApiCall(apiConfig);

  try {
    const { data } = await apiCall();
    return { ok: true, data };
  } catch (e) {
    console.error('e', e);
    return { ok: false };
  }
};
