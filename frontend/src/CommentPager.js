import React from "react";
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

const CommentPager = ({ pages, id, current }) => {
  const navigate = useNavigate();
  const currentPage = parseInt(current, 10) + 1;

  const goToPage = (pageNum) => {
    navigate(`/${id}/comment?start=${(pageNum - 1) * 500}`);
  };

  const items = [];

  // Helper function to add page items
  const addPageItem = (number) => {
    items.push(
      <Pagination.Item key={number} 
                       active={number === currentPage} 
                       onClick={() => goToPage(number)}>
        {number}
      </Pagination.Item>
    );
  };

  // Always add the first two pages
  addPageItem(1);
  addPageItem(2);

  // Add ellipsis after the first two pages if needed
  if (currentPage > 4) items.push(<Pagination.Ellipsis key='start-ellipsis'/>);

  // Add the current page - 1, current page, and current page + 1 if applicable
  if (currentPage > 3) addPageItem(currentPage - 1);
  addPageItem(currentPage);
  if (currentPage < pages - 2) addPageItem(currentPage + 1);

  // Add ellipsis before the last two pages if needed
  if (currentPage < pages - 3) items.push(<Pagination.Ellipsis key='end-ellipsis'/>);

  // Always add the last two pages
  addPageItem(pages - 1);
  addPageItem(pages);

  return (
    <Pagination>
      <Pagination.Prev onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} />
      {items}
      <Pagination.Next onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pages}/>
    </Pagination>
  );
};

export default CommentPager;
