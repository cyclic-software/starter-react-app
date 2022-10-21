import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ContentContext } from "../context/ContentProvider";
import { Link } from "react-router-dom";
import { ReactComponent as SolidHeart } from "../assets/solid-heart.svg";
import { ReactComponent as LineHeart } from "../assets/line-heart.svg";

export default function Feedback(props) {
  const {
    likePost,
    removeLike,
    state,
    getOnePost,
  } = useContext(ContentContext);
  const { postId: thisPostId, likeStatus, comments, likes } = props;


  let commentTotal = comments?.length;

  function handleSinglePost(idString) {
    console.log("idString submitted by feedback to handleSinglePost");
    console.log(idString);
    getOnePost(idString);
  }

  const location = useLocation();

  const likedHeart = (
    <SolidHeart
      className="liked-heart heart"
      onClick={
        likeStatus === "liked"
          ? () => removeLike(thisPostId)
          : () => likePost(thisPostId)
      }
    />
  );

  const neutralHeart = (
    <LineHeart
      className="neutral-heart heart"
      onClick={
        likeStatus === "liked"
          ? () => removeLike(thisPostId)
          : () => likePost(thisPostId)
      }
    />
  );

  const singlePostView = (
    <div className="feedback-box">
      <div className="like-box">
        <h6 className="like-number">{state.currentPost?.likes?.length}</h6>
        {likeStatus === "liked" ? likedHeart : neutralHeart}
      </div>
      <h5 className="feedback-comments">{commentTotal} Comments</h5>
    </div>
  );

  const listView = (
    <div className="feedback-box list">
      <div className="like-box">
        <h6 className="like-number">{likes?.length}</h6>
        {likeStatus === "liked" ? likedHeart : neutralHeart}
      </div>
      <Link to={`/single-post/${thisPostId}`} className="link-element">
        <div
          className="feedback-comments"
          onClick={() => handleSinglePost(thisPostId)}
        >
          <h6>{commentTotal} Comments</h6>
        </div>
      </Link>
    </div>
  );

  return (
    <>
      {location.pathname !== `/single-post/${thisPostId}`
        ? listView
        : singlePostView}
    </>
  );
}
