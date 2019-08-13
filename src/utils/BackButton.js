import React from 'react'
// import { withRouter } from 'react-router-dom'


let BackButton = (props) => {
    return (
        <div>
            <div className="arrow arrow--left" onClick={props.handleClickedBackButton}></div>
        </div>
    )
}

export default BackButton