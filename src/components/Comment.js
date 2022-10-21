import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { ContentContext } from "../context/ContentProvider";
import UserAvatar from "./UserAvatar";

export default function Comment(props) {
  const { user } = useContext(UserContext);
  const { deleteComment, state } = useContext(ContentContext);
  const { comment, author, _id: commentId } = props;

  const postId = state.currentPost._id;

  const ownComment = (
    <>
      <UserAvatar
        name={author?.username}
        size={20}
        className="comment-author"
      />
      <p className="comment-content">{comment}</p>
      <div>
        <button onClick={() => deleteComment(postId, commentId)}>Delete</button>
      </div>
    </>
  );

  const otherComment = (
    <>
      <UserAvatar
        name={author?.username}
        size={20}
        className="comment-author"
      />
      <p className="comment-content">{comment}</p>
    </>
  );

  return (
    <div className="single-comment-box">
      {user._id === author._id ? ownComment : otherComment}
    </div>
  );
}
