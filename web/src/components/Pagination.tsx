import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

interface IProps {
  totalCount: number;
  pageSize?: number;
}

const CustomPagination = (props: IProps) => {
  const { totalCount, pageSize = 20 } = props;
  const totalPages = Math.ceil(totalCount / pageSize);
  const router = useRouter();
  const { query } = router;
  const currentPage = Number(query.page) || 1;

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      router.push({
        query: {
          ...(Number(pageNumber) === 1 ? "" : { page: pageNumber }),
        },
      });
    },
    [router]
  );

  const renderPaginationItems = () => {
    const startPage = Math.max(1, currentPage - 5);
    const endPage = Math.min(totalPages, startPage + 9);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;
      return (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => handleChangePage(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      );
    });
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => handleChangePage(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => handleChangePage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />
      {renderPaginationItems()}
      <Pagination.Next
        onClick={() => handleChangePage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last onClick={() => handleChangePage(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default CustomPagination;
