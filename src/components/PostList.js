import React, { useContext, useState } from "react";
import Post from "./Post";
import Filter from "./Filter";
import { ContentContext } from "../context/ContentProvider";

export default function PostList(props) {
  const { state } = useContext(ContentContext);
  const [filteredPosts, setFilteredPosts] = useState();
  const tags = state.posts.map((post) => post.tag);

  console.log(state.posts)

  const displayAll = (
    <>
      {state?.posts?.map((post, index) => (
        <Post {...post} key={post._id} id={post._id} index={index} />
      ))}
    </>
  );

  const displayFilteredPosts = (
    <>
      {filteredPosts?.map((post, index) => (
        <Post {...post} key={post._id} id={post._id} index={index} />
      ))}
    </>
  );

  return (
    <div className="post-list-box">
      <Filter
        postArray={state.posts}
        setFilteredPosts={setFilteredPosts}
        tags={tags}
      />
      <div className="post-list">
        {filteredPosts ? displayFilteredPosts : displayAll}
      </div>
    </div>
  );
}
