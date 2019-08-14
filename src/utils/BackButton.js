import React from 'react'

let BackButton = (props) => {
    return (
        <div className="backButton-container">
            <div className="arrow arrow--left" onClick={props.handleClickedBackButton}></div>
        </div>
    )
}

export default BackButton