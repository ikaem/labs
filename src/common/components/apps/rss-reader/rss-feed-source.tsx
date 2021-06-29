import { RSSArticleItem } from '../../../../services/rss-reader/types';

interface RSSFeedSourceProps {
  rssArticles: RSSArticleItem[];
}

export const RSSFeedSource: React.FC<RSSFeedSourceProps> = ({
  rssArticles,
}) => {
  return (
    <div className='rss-feed-source'>
      {rssArticles.map(({ id, name, body, email }) => {
        return (
          <article key={id} className='rss-feed-source_article'>
            <header className='article_header'>
              <h3>{name}</h3>
              <span>{email}</span>
            </header>
            <div className='article_body'>
              <p>{body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};
