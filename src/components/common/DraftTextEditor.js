import React from 'react';
import Editor, { createEditorStateWithText, createEmpty } from 'draft-js-plugins-editor';
import {stateToHTML} from 'draft-js-export-html';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
  SubButton,
  SupButton
} from 'draft-js-buttons';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
const text = 'Enter your code snippet and related information here...';

export default class DraftTextEditor extends React.Component {
    state = {
        editorState: createEditorStateWithText(text),
      };
    
    onChange = (editorState) => {
        this.setState({
          editorState,
        },() => {
            this.props.onStateChange(stateToHTML(this.state.editorState.getCurrentContent()))
            localStorage.setItem('pinbody', stateToHTML(this.state.editorState.getCurrentContent()))
        });
    };
        
    focus = () => {
        this.editor.focus();
    };
    
    render() {    
        const body = stateToHTML(this.props.value)
        return (
                <div className="editor" onClick={this.focus}>
                    <Toolbar>
                        {
                            // may be use React.Fragment instead of div to improve perfomance after React 16
                            (externalProps) => (
                            <div>
                                <BoldButton {...externalProps} />
                                <ItalicButton {...externalProps} />
                                <UnderlineButton {...externalProps} />
                                <Separator {...externalProps} />
                                <HeadlineOneButton {...externalProps} />
                                <HeadlineTwoButton {...externalProps} />
                                <HeadlineThreeButton {...externalProps} />
                                <Separator {...externalProps} />
                                <UnorderedListButton {...externalProps} />
                                <OrderedListButton {...externalProps} />
                                <BlockquoteButton {...externalProps} />
                                <CodeBlockButton {...externalProps} />
                                <SubButton {...externalProps} />
                                <SupButton {...externalProps} />
                            </div>
                            )
                        }
                    </Toolbar>
                    <Editor
                        editorState={body}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                        customStyleMap={{
                            SUBSCRIPT: { fontSize: '0.6em', verticalAlign: 'sub' },
                            SUPERSCRIPT: { fontSize: '0.6em', verticalAlign: 'super' }
                        }}
                    />
                </div>
        );
      }
}