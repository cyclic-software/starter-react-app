import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContentContext } from "../context/ContentProvider";
import Post from "../components/Post";
import CommentForm from "../components/CommentForm";
import CommentBox from "../components/CommentBox";

export default function SinglePost(props) {
  const { state, getOnePost } = useContext(ContentContext);
  const { singlePostId } = useParams();
  let currentPost = state.currentPost;

  useEffect(() => {
    getOnePost(singlePostId);
  }, []);

  return (
    <div className="single-post page">
      <Post {...currentPost} key={currentPost._id} id={currentPost._id} />
      <div className="comment-container">
        <CommentBox {...currentPost} />
        <CommentForm postId={currentPost._id} />
      </div>
    </div>
  );
}
