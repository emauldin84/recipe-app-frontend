import React, { Component } from 'react'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'

import createHighlightPlugin from './plugins/highlightPlugin'
import addLinkPlugin from './plugins/addLinkPlugin'
import BlockStyleToolbar, { getBlockStyle } from './blockStyles/BlockStyleToolbar'

const highlightPlugin = createHighlightPlugin();


class TextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }

    plugins = [
        highlightPlugin,
        addLinkPlugin
    ]

    onChange = (editorState) => {
        let contentState = this.state.editorState.getCurrentContent()
        let uploadDetails = convertToRaw(contentState)
        uploadDetails["content"] = JSON.stringify(uploadDetails.content)

        this.setState({
            editorState
        }, this.props.onTextEditorChangeHandler(this.state.editorState, uploadDetails))
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    onUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
    }
    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }
    onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }
    onHighlightClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'))
    }

    toggleBlockType = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
    }

    render() {
        return (
            <div>
                <button onClick={this.onUnderlineClick} title='underline'><u>U</u></button>
                <button onClick={this.onBoldClick} title='bold'><b>B</b></button>
                <button onClick={this.onItalicClick} title='italics'><em>I</em></button>
                <button className="highlight" onClick={this.onHighlightClick} title='highlight'><span style={{background: 'yellow'}}>H</span></button>
                <BlockStyleToolbar
                    editorState={this.state.editorState}
                    onToggle={this.toggleBlockType}
                />
                <div className="editors">
                    <Editor 
                        blockStyleFn={getBlockStyle}
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        plugins={this.plugins}
                        placeholder='Enter ingredients, timing and recipe steps...'
                        spellCheck={true}
                        readOnly={false}
                    />

                </div>
            </div>
        )
    }
}

export default TextEditor