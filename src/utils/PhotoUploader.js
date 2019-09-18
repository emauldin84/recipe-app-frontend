import React, { Component } from 'react'

class PhotoUploader extends Component {

    handleClick = (e) => {
        e.preventDefault()
        this.refs.fileUploader.click();
}

    render() {
        let filePreview = this.props.image ? `${this.props.image.name}` : null

    return(
        <div className='photoUploaderContainer'>
            <input type='file' id='file' name='photo' accept="image/*" ref='fileUploader' style={{ display: 'none'}} onChange={this.props.handleImageSelect} />
            <button className='photoUploadButton' onClick={this.handleClick}>Add Recipe Photo</button>
            {filePreview}
        </div>
    )


    }
}

export default PhotoUploader