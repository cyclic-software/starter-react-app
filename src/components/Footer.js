import React from "react"

export default function Footer() {
    return(
        <footer>
            <div className='social'>
                <ul>
                    <li><a href='#'><box-icon type='logo' name='facebook-circle'></box-icon></a></li>
                    <li><a href='#'><box-icon type='logo' name='instagram-alt' ></box-icon></a></li>
                    <li><a href='#'><box-icon type='logo' name='github' ></box-icon></a></li>
                </ul>
            </div>
            <p className="creator">Created by Nyi Nyi Moe Htet</p>
        </footer>
    )
}