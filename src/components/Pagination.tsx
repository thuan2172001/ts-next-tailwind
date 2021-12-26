import { Pagination } from 'antd';
import clsx from 'clsx';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { GrNext, GrPrevious } from 'react-icons/gr';

enum PageChangeType {
  Prev,
  Next,
  JumpPrev,
  JumpNext,
}

export const PageNavigation = ({
  totalItem,
  itemsPerPage,
  className,
  page = 1,
  setPage,
  style,
}: {
  totalItem: number;
  itemsPerPage: number;
  className?: string;
  page: number;
  setPage: (page: number) => void;
  style?: React.CSSProperties;
}) => {
  const stepChange = (type: PageChangeType) => {
    const totalPage = Math.ceil(totalItem / itemsPerPage);
    switch (type) {
      case PageChangeType.Prev:
        setPage(page > 1 ? page - 1 : page);
        break;
      case PageChangeType.Next:
        setPage(page < totalPage ? page + 1 : page);
        break;
      case PageChangeType.JumpPrev:
        setPage(page > 5 ? page - 5 : 1);
        break;
      case PageChangeType.JumpNext:
        setPage(page + 4 < totalPage ? page + 5 : totalPage);
        break;
    }
  };

  return (
    <Pagination
      showSizeChanger={false}
      className={clsx(className, 'pagination')}
      style={style}
      defaultCurrent={page}
      current={page}
      total={totalItem}
      pageSize={itemsPerPage}
      itemRender={(current, type, originalElement) => {
        if (type === 'prev') {
          return (
            <span onClick={() => stepChange(PageChangeType.Prev)}>
              {page > 1 ? (
                <FcPrevious
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: 'scale(0.5)',
                  }}
                />
              ) : (
                <GrPrevious
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: 'scale(0.5)',
                  }}
                />
              )}
            </span>
          );
        }
        if (type === 'next') {
          return (
            <span onClick={() => stepChange(PageChangeType.Next)}>
              {page < Math.ceil(totalItem / itemsPerPage) ? (
                <FcNext
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: 'scale(0.5)',
                  }}
                />
              ) : (
                <GrNext
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: 'scale(0.5)',
                  }}
                />
              )}
            </span>
          );
        }
        if (type === 'jump-next' || type === 'jump-prev')
          return (
            <span
              onClick={() => {
                stepChange(
                  type === 'jump-next'
                    ? PageChangeType.JumpNext
                    : PageChangeType.JumpPrev
                );
              }}
            >
              {originalElement}
            </span>
          );
        return (
          <span
            className='pagination-item'
            onClick={() => {
              setPage(current);
            }}
          >
            {current}
          </span>
        );
      }}
    />
  );
};
