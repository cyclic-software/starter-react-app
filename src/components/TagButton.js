import React from 'react'

export default function TagButton(props){

  const { tag, tagFilter, postArray } = props

  function handleTags(string) {
    if (string?.length < 1){
      return null
    } else {
    return string.split("-").join(" ");
    }
  }

  return (
    <>
      {tag && <h6 className={`post-tag ${tag} filter`} onClick={() => tagFilter(postArray, tag)}>{handleTags(tag)}</h6>}
    </>
  )
}