import React, { Component } from 'react'

class PhotoUploader extends Component {
    handleClick =(e) => {
        e.preventDefault()
        this.refs.fileUploader.click();
}

    render() {

    return(
        <div className='photoUploaderContainer'>
            <input type='file' id='file' ref='fileUploader' style={{ display: 'none'}} />
            <button className='photoUploadButton' onClick={this.handleClick}>Add Recipe Photo</button>
        </div>
    )


    }
}

export default PhotoUploader