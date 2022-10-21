import React, { useState, useEffect } from "react";
import TagButton from "./TagButton";

export default function Filter(props) {
  const { tags, postArray, setFilteredPosts } = props;
  const [displayFilters, setDisplayFilters] = useState(true)

  const uniqueTags = [...new Set(tags)];

  function tagFilter(postArray, property) {
    console.log("filter function called");
    const postsByTag = postArray.filter((post) => post.tag === property);
    setFilteredPosts(postsByTag);
  }

  useEffect(() => {
    if (window.screen.width < 500){
    setDisplayFilters(false)
    }
  }, [])

  function toggleFilters(){
    setDisplayFilters(prev => !prev)
  }

  const showFilters = (
    <div className="filter-box">
      <div className="filter-list filter-box">
        <button onClick={ toggleFilters }>Hide Filters</button>
        <h6 className="filter-title">Filter:</h6>
        <h6
          className={`post-tag all-posts filter`}
          onClick={() => setFilteredPosts()}
        >
          all posts
        </h6>
        {uniqueTags?.map((tag, index) => (
          <TagButton
            tag={tag}
            tagFilter={tagFilter}
            postArray={postArray}
            key={index}
          />
        ))}
      </div>
    </div>
  )

  const hideFilters = (
      <div className='filter-box'>
        <button onClick={ toggleFilters }>Show filters</button>
      </div>
    )
  

  return (
    displayFilters ? showFilters : hideFilters
  );
}
