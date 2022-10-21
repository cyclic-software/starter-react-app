import React from 'react'

export default function Heart(props){
  const { likeStatus, likePost, removeLike, postId} = props
  console.log(likeStatus)

  return (
    <div className='heart-icon'
    onClick={
      likeStatus === "liked"
        ? () => removeLike(postId)
        : () => likePost(postId)
    }
    >
      <div className={`heart-fill-${likeStatus}`}>
        <div className='heart-1-fill' />
        <div className='heart-2-fill' />
      </div>
      <div className={`heart-border-${likeStatus}`}>
        <div className='heart-1-border' />
        <div className='heart-2-border' />
      </div>
    </div>
  )
}