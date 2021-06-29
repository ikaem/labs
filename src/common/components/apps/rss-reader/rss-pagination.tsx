import React from 'react';

interface RSSPaginationProps {
  navigate: (direction: 'prev' | 'next') => void;
  totalPages: number;
  pageSize: number;
  currentPage: number;
  changePageSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const RSSPagination: React.FC<RSSPaginationProps> = ({
  navigate,
  totalPages,
  pageSize,
  currentPage,
  changePageSize,
}) => {
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages - 1;

  return (
    <div className='rss-pagination'>
      <div className='rss-pagination_navigators'>
        <button disabled={prevDisabled} onClick={() => navigate('prev')}>
          {'<'}
        </button>
        <button disabled={nextDisabled} onClick={() => navigate('next')}>
          {'>'}
        </button>
      </div>
      <div className='rss-pagination_page-size'>
        <form>
          <div className='form-group'>
            <label htmlFor='pageSize'>Page size</label>
            <select
              name='pageSize'
              id='pageSize'
              value={pageSize}
              onChange={changePageSize}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};
