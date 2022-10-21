import React, { useContext, useEffect } from "react";
import PostList from "../components/PostList";
import { ContentContext } from "../context/ContentProvider";
import { UserContext } from "../context/UserProvider";

export default function Profile() {
  const { state, getUserPosts } = useContext(ContentContext);

  const {
    user: { username },
  } = useContext(UserContext);

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <div className="profile-page page">
      <h5 className='page-title'>Hi, {username}! Here are your posts:</h5>
      <PostList posts={state.posts} />
    </div>
  );
}
