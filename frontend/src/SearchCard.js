import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function highlightTerm(text, term) { 
    const pattern = new RegExp(`(${term})`, "gi"); 
    return text.replace(pattern, "<mark>$1</mark>"); 
}

const SearchCard = ({ discussion, query }) => {
  if (!discussion.results.length) {
      return null;
  }

  return (    
    <Card style={{ margin: '1em 0' }}>
      <Card.Header as="h5" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to={`/${discussion.id}`}>{discussion.title}</Link>
        <Link to={`/${discussion.id}/comment?start=0`}>查看评论</Link>
      </Card.Header>
      <Card.Body>
        {discussion.results.map((result, index) => (
          <Card.Text key={index} dangerouslySetInnerHTML={{ __html: highlightTerm(result.data["Reply Content"], query) }} />
        ))}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated {discussion.results[0].data && discussion.results[0].data["Reply Time"]}</small>
      </Card.Footer>
    </Card>
  );
};

export default SearchCard;
