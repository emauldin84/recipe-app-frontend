import React, { Component } from 'react'
import { Editor, RichUtils, convertToRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'

import BlockStyleToolbar, { getBlockStyle } from './blockStyles/BlockStyleToolbar'


class TextEditor extends Component {
    state = {
        editorState: this.props.editedDetails,
    }


    onChange = (editorState) => {
        let contentState = this.state.editorState.getCurrentContent()
        let uploadDetails = convertToRaw(contentState)
        uploadDetails["content"] = JSON.stringify(uploadDetails.content)

        this.setState({
            editorState
        }, this.props.onTextEditorChangeHandlerEdit(uploadDetails))
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    onUnderlineClick = (e) => {
        e.preventDefault()
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
    }
    onBoldClick = (e) => {
        e.preventDefault()
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }
    onItalicClick = (e) => {
        e.preventDefault()
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    toggleBlockType = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
    }

    render() {
        return (
            <div>
                <div className='formatButtonsContainer'>
                    <button className="formatButtons" onClick={this.onUnderlineClick} title='underline'><u>U</u></button>
                    <button className="formatButtons" onClick={this.onBoldClick} title='bold'><b>B</b></button>
                    <button className="formatButtons" onClick={this.onItalicClick} title='italics'><em>I</em></button>
                    <BlockStyleToolbar
                        editorState={this.state.editorState}
                        onToggle={this.toggleBlockType}
                    />
                </div>
                <div className="editors">
                    <Editor 
                        blockStyleFn={getBlockStyle}
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        placeholder='Enter ingredients, timing and recipe steps...'
                        spellCheck
                        readOnly={false}
                    />

                </div>
            </div>
        )
    }
}

export default TextEditor