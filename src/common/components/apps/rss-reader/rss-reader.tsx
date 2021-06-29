import { RSSPagination } from '.';
import { DeleteIcon, EditIcon, NewFileIcon } from '../..';
import { RSSFeedSource } from '.';
import { useRSSReader } from '../../../../services/rss-reader';

export const RSSReader: React.FC = () => {
  const {
    paginatedArticles,
    feeds,
    pageSize,
    currentPage,
    totalPages,
    navigate,
    changePageSize,
  } = useRSSReader();

  return (
    <>
      <section className='rss-reader'>
        <header className='rss-reader_header'>
          <h2>RSS Reader</h2>
          <div className='header_actions'>
            <button
              onClick={() =>
                console.log('This would open modal to add a new feed')
              }
            >
              <NewFileIcon className='new-rss-icon icon' title='New RSS feed' />
            </button>
          </div>
        </header>

        <div className='rss-reader_feed-selector'>
          <form className='feed-selector_form'>
            <div className='form-group'>
              <label htmlFor='selectFeed'>Select feed:</label>

              <select name='selectFeed' id='selectFeed'>
                {feeds.map((f) => (
                  <option key={f.url} value={f.url}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <div className='feed-selection_actions'>
            <button>
              <EditIcon className='new-rss-icon icon' title='Edit RSS feed' />
            </button>
            <button>
              <DeleteIcon
                className='delete-icon icon'
                title='Delete RSS feed'
              />
            </button>
          </div>
        </div>

        <RSSFeedSource rssArticles={paginatedArticles} />

        <RSSPagination
          navigate={navigate}
          totalPages={totalPages}
          pageSize={pageSize}
          currentPage={currentPage}
          changePageSize={changePageSize}
        />
      </section>
    </>
  );
};
