import { Dispatch, SetStateAction, useState } from 'react';
import { createContext } from 'react';
import { CurrentRSSFeed, RSSFeed } from '../types';

const initialFeedsState: RSSFeed[] = [
  {
    url: 'https://jsonplaceholder.typicode.com/comments',
    name: 'JSON Placeholder Comments',
  },
];

const initialCurrentFeedState: CurrentRSSFeed = {
  url: initialFeedsState[0].url,
  name: initialFeedsState[0].name,
  articles: [],
};

export const RSSReaderContext = createContext<{
  currentFeed: CurrentRSSFeed;
  setCurrentFeed: Dispatch<SetStateAction<CurrentRSSFeed>>;
  feeds: RSSFeed[];
  setFeeds: Dispatch<SetStateAction<RSSFeed[]>>;
}>({
  currentFeed: initialCurrentFeedState,
  setCurrentFeed: () => {},
  feeds: [],
  setFeeds: () => {},
});

export const RSSReaderProvider: React.FC = ({ children }) => {
  const [currentFeed, setCurrentFeed] = useState<CurrentRSSFeed>(
    initialCurrentFeedState
  );
  const [feeds, setFeeds] = useState(initialFeedsState);

  return (
    <RSSReaderContext.Provider
      value={{ currentFeed, setCurrentFeed, feeds, setFeeds }}
    >
      {children}
    </RSSReaderContext.Provider>
  );
};
