import React from "react";
import "../css/Pagination.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
  pagesPerGroup,
}) => {
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // 전체 페이지 그룹 수 계산
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);
  // 현재 페이지가 속한 페이지 그룹 번호 계산
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  // 페이지 번호를 클릭할 때 호출되는 함수
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 이전 그룹으로 이동
  const prevGroup = () => {
    const newPage = (currentGroup - 1) * pagesPerGroup;
    setCurrentPage(Math.max(newPage, 1));
  };

  // 다음 그룹으로 이동
  const nextGroup = () => {
    const newStartPage = startPage + pagesPerGroup;
    const newEndPage = Math.min(newStartPage + pagesPerGroup - 1, totalPages);
    setCurrentPage(newStartPage);
    if (newStartPage === 1) { // 다음 그룹 버튼을 눌렀을 때 1번째 페이지가 최신 페이지가 되도록 함
      setCurrentPage(totalPages);
    }
  };

  // 페이지 그룹의 시작 페이지와 끝 페이지 계산
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // 현재 페이지 그룹에 표시할 페이지 목록 계산
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {/* 이전 그룹 버튼 */}
        <li>
          <a href="#" onClick={prevGroup} style={{ cursor: "pointer" }}>
            &laquo;
          </a>
        </li>
        {/* 페이지 그룹의 페이지 버튼 */}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <a
              href="#"
              onClick={() => handleClick(pageNumber)}
              className={pageNumber === currentPage ? "active" : ""}
              style={{ cursor: "pointer" }}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        {/* 다음 그룹 버튼 */}
        <li>
          <a href="#" onClick={nextGroup} style={{ cursor: "pointer" }}>
            &raquo;
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;