import React from 'react'

export default function Profile(props) {
    let username = 'User'
    if(props.user) {
        username = props.user.firstname[0] + props.user.lastname[0]
    }


    return(
        <div className='profile'>
            <div className='profile-icon' alt="user-profile-icon">{username}</div>
            <div>
                <p><span className='italic'>Name:</span> {props.user ? props.user.firstname + " " + props.user.lastname : username}</p>
                <p><span className='italic'>No. of books purchased:</span> {props.user ? props.user.purchasedBooks.length : 0}</p>
            </div>
        </div>
    )
}