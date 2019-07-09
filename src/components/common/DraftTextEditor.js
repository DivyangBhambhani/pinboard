import React from 'react';
import Editor, { createEditorStateWithText, createEmpty } from 'draft-js-plugins-editor';
import {EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import {stateFromHTML} from 'draft-js-import-html';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import FormLabel from '@material-ui/core/FormLabel';
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
const text = 'Enter the content of your pin here...';

export default class DraftTextEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }
    
    componentDidMount() {
        if(this.props && this.props.value != '') {
                this.setState({
                editorState: EditorState.createWithContent(stateFromHTML(this.props.value))
            })
        }
    }

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
        let {pin} = this.props
        return (
                <div className={this.props.readOnly ? "editor editorReadonly" : "editor"} onClick={this.focus}>
                <FormLabel component="legend">Pin Content *</FormLabel>
                {!this.props.readOnly &&
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
                                { pin && (pin.type == "Component" || pin.type == "Code Snippet" || pin.type == "Task List") &&
                                    <span>
                                        <UnorderedListButton {...externalProps} />
                                        <OrderedListButton {...externalProps} />
                                    </span>
                                }
                                <BlockquoteButton {...externalProps} />
                                { pin && (pin.type == "Component" || pin.type == "Code Snippet") &&
                                    <CodeBlockButton {...externalProps} />
                                }
                                { pin && pin.type == "Component" &&
                                    <span>
                                        <SubButton {...externalProps} />
                                        <SupButton {...externalProps} />
                                    </span>
                                }
                            </div>
                            )
                        }
                    </Toolbar>
                }
                    <Editor
                        editorState={this.state.editorState}
                        onChange={!this.props.readOnly ? this.onChange : ()=>(false)}
                        plugins={plugins}
                        readOnly={this.props.readOnly}
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