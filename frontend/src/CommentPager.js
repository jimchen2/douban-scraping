import React from "react";
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

const CommentPager = ({ pages, id, current }) => {
  const navigate = useNavigate();
  const itemsPerPage = 500;
  // Calculate current page based on the 'start' parameter divided by items per page.
  const currentPage = parseInt(current, 10) / itemsPerPage + 1;

  const goToPage = (pageNum) => {
    // Calculate 'start' parameter for the new page
    navigate(`/${id}/comment?start=${(pageNum - 1) * itemsPerPage}`);
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

  // Always add the first page
  if (currentPage > 1) addPageItem(1);

  // Add the second page if the current page is greater than 3
  if (currentPage > 3) addPageItem(2);

  // Add ellipsis after the first page if needed
  if (currentPage > 4) items.push(<Pagination.Ellipsis key='start-ellipsis'/>);

  // Add the current page - 1 if applicable
  if (currentPage > 1) addPageItem(currentPage - 1);
  
  // Add the current page
  addPageItem(currentPage);
  
  // Add the current page + 1 if applicable
  if (currentPage < pages) addPageItem(currentPage + 1);

  // Add ellipsis before the last page if needed
  if (currentPage < pages - 1) items.push(<Pagination.Ellipsis key='end-ellipsis'/>);

  // Add the last page if the current page is less than the last page - 1
  if (currentPage < pages - 2) addPageItem(pages);

  return (
    <Pagination>
      <Pagination.Prev onClick={() => goToPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />
      {items}
      <Pagination.Next onClick={() => goToPage(Math.min(pages, currentPage + 1))} disabled={currentPage === pages}/>
    </Pagination>
  );
};

export default CommentPager;
