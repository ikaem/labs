import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { RSSReaderContext } from '../context/provider';
import { fetchFeedArticles } from '../utils';

export const useRSSReader = () => {
  const {
    currentFeed: { url, articles },
    setCurrentFeed,
    feeds,
  } = useContext(RSSReaderContext);

  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedArticles = useMemo(() => {
    const end = pageSize * currentPage;
    const start = end - pageSize;

    return [...articles].slice(start, end);
  }, [pageSize, currentPage, articles]);

  const totalPages = useMemo(() => {
    return Math.ceil(articles.length / pageSize);
  }, [pageSize, currentPage, articles]);

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentPage((prev) => {
      return prev + (direction === 'prev' ? -1 : 1);
    });
  };

  const changePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPageSize(Number(value));
  };

  const getRSSArticles = useCallback(async () => {
    const { ok, data } = await fetchFeedArticles(url);

    if (ok) {
      return setCurrentFeed((prev) => {
        return { ...prev, articles: data };
      });
    }

    // TODO some toast notifications
    console.log('There was an error fetching feed articles');
  }, [url]);

  useEffect(() => {
    getRSSArticles();
  }, [url, getRSSArticles]);

  return {
    paginatedArticles,
    feeds,
    pageSize,
    currentPage,
    totalPages,
    navigate,
    changePageSize,
  };
};
