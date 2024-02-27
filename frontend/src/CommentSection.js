// CommentSection.js

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import CommentCard from "./CommentCard";
import CommentPager from "./CommentPager";
import BACKEND_URL from './config'; // import the backend URL

const CommentSection = () => {
  const { id } = useParams();
  const location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let start = queryParams.get("start");

  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const processMediaUrls = (imageURL, gifURL) => {
    let mediaDetails = [];
    if (imageURL !== "No media found") {
      const fileIdentifier = imageURL.match(/p[\d]+/);
      if (fileIdentifier) {
        mediaDetails.push({
          localUrl: `${BACKEND_URL}/media/${fileIdentifier[0]}.jpg`,
          isImage: true,
        });
      }
    }
    if (gifURL !== "No media found") {
      const fileIdentifier = gifURL.match(/p[\d]+/);
      if (fileIdentifier) {
        mediaDetails.push({
          localUrl: `${BACKEND_URL}/media/${fileIdentifier[0]}.mp4`,
          isImage: false,
        });
      }
    }
    return mediaDetails;
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/discussions`)
      .then((response) => response.json())
      .then((data) => {
        const foundDiscussion = data.find(
          (discussion) => discussion["Topic ID"] === id
        );
        if (foundDiscussion) {
          setTotalPages(
            Math.ceil(parseInt(foundDiscussion["Replies"], 10) / 500)
          );
        } else {
          console.error(`No discussions found with Topic ID: ${id}`);
        }
      });

    let url = start
    ? `${BACKEND_URL}/api/comments/${id}?start=${start}`
    : `${BACKEND_URL}/api/comments/${id}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((comment) => {
          const {
            "Image URL": imageURL,
            "GIF URL": gifURL,
            "Reply To Content": replyToContent,
            "Reply To Author": replyToAuthor,
          } = comment.data;
          const mediaDetails = processMediaUrls(imageURL, gifURL);

          return {
            ...comment,
            mediaDetails,
            replyToContent,
            replyToAuthor,
          };
        });
        setComments(processedData);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id, start]);

  return (
    <>
      <br></br>

      <CommentPager pages={totalPages} id={id} current={start || 0} />
      <br />
      <br />

      <Container>
        {comments.map((comment, index) => {
          return <CommentCard key={index} index={index} comment={comment} />;
        })}
      </Container>
      <br />

      <CommentPager pages={totalPages} id={id} current={start || 0} />
      <br />
      <br />
    </>
  );
};

export default CommentSection;
