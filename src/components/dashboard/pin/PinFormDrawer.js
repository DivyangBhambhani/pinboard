import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DraftTextEditor from '../../common/DraftTextEditor';
import AutocompleteMultiple from '../../common/AutocompleteMultiple';
import SelectDropDown from '../../common/SelectDropDown';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getUsers, getTags, getBoards} from  '../../utils/api';
import EditViewSwitch from '../../common/EditViewSwitch';
import PinBoardDz from '../../common/PinBoardDz';
import RenderChips from '../../common/RenderChips';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color:'#ffffff'
  },
  paper: {
      background: '#f3f0f0 !important'
  },
  layout: {
    width: 'auto',
    marginTop: '20px',
    background:'#ffffff !important',
    padding: '2rem',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: '5rem',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const pinboardUsers = getUsers()
const boards = getBoards()
const tagCollection = getTags()

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.node.isRequired,
    window: PropTypes.func,
};

export default function PinFormDrawer(props) {
    const classes = useStyles();

    const [owner, setOwner] = React.useState('');
    const [contributors, setContributors] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [pinTitle, setPinTitle] = React.useState('');
    const [board, setBoard] = React.useState('');
    const [pinBody, setPinBody] = React.useState('');
    const [command, setCommand] = React.useState('');

    const [newBoardName, setNewBoardName] = React.useState('');
    const [openBoardForm, setopenBoardForm] = React.useState(false);
    const [switchOn, setSwitchOn] = useState(true)

    const handleCloseBoardForm = () => {
        setopenBoardForm(false);
        clearState()
    }
    const handleSwitchOn = (flag) => {
        setSwitchOn(flag.checkedA)
    }
    
    useEffect(() => {
        if ((props.mode == "edit" || props.mode == "view") && props.pinObj) {
            
            setPinTitle(props.pinObj.pinTitle)
            setBoard(props.pinObj.board)
            setTags(props.pinObj.tags)
            setContributors(props.pinObj.contributors)
            setPinBody(props.pinObj.pinBody)
            setCommand(props.pinObj.command)
            setSwitchOn(props.mode == "view" ? false : true)
        }
    },[props])

    const clearState = () => {
        setPinTitle('')
        setBoard('')
        setTags([])
        setContributors([])
        setPinBody('')
        setCommand('')
        setSwitchOn(switchOn)
        setopenBoardForm(false)
        setNewBoardName('')
    }

    const handleCommand = (e) => {
        setCommand(e.target.value)
    }

    const handlePinTitle = (e) => {
        setPinTitle(e.target.value)
    }

    const handleTags = (selectedItem) => {
        setTags(selectedItem)
    }

    const handleContributors = (selectedItem) => {
        setContributors(selectedItem)
    }

    const handleSelectBoard = (value) => {
        if(value == "0") {
            setopenBoardForm(true)
        } else {
            setBoard(value)
        }
    }

    const handlePinBody = (value) => {
        setPinBody(value)
    }

    const handleChangeCreateNewBoard = (e) => {
        setNewBoardName(e.target.value)
    }

    const handleSaveCreateNewBoard = () => {
        let newItem = {value: boards.length, label: newBoardName}
        localStorage.setItem('board', newItem)
        boards.push(newItem)
        setBoard(newItem.value)
        setopenBoardForm(false)
    }

    const handleSavePin = () => {
        localStorage.setItem('pin',JSON.stringify({
            pinTitle,
            type: props.pinObj ? props.pinObj.type : '',
            pinBody,
            tags,
            contributors,
            owner,
            board
        }))
        props.onClickDrawerClose()
        clearState()
    }

    const handleCloseDrawer = () => {
        props.onClickDrawerClose()
        clearState()
    }

    return (
        <div>
            <Dialog classes={{paper:classes.paper}} fullScreen open={props.openPinDrawer} onClose={handleCloseDrawer} TransitionComponent={Transition}>
            <ElevationScroll {...props}>
                    <AppBar>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleCloseDrawer} aria-label="Close">
                            <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                            {`${props.mode=="edit" ? 'Edit' : props.mode == "view" ? 'View' : 'Add'} ${props.pinObj ? props.pinObj.type : ''}`}
                            </Typography>
                            <Button color="inherit" onClick={handleSavePin}>
                            save
                            </Button>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <React.Fragment>
                    <div className={classes.layout}>
                        { props && props.mode == "edit" && (props.user.displayName == props.pinObj.owner) &&
                            <EditViewSwitch 
                                mode={props.mode}
                                user={props.user}
                                pin={props.pinObj}
                                onStateChange={handleSwitchOn}
                            />
                        }
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            { switchOn &&
                                <TextField
                                    required
                                    id="pinTitle"
                                    name="pinTitle"
                                    label="Pin Title"
                                    value={pinTitle}
                                    fullWidth
                                    onChange={handlePinTitle}
                                />
                            }
                            { !switchOn &&
                                <div className="display-4">
                                    {pinTitle}
                                </div>
                            }
                            </Grid>
                            <Grid item xs={12}>
                                <DraftTextEditor 
                                    onStateChange={handlePinBody}
                                    pin={props.pinObj}
                                    readOnly={!switchOn ? true : false}
                                    value={pinBody} />
                            </Grid>
                            <Grid item xs={12}>
                                { switchOn &&
                                    <AutocompleteMultiple 
                                        label="Tags" 
                                        user={props.user}
                                        collection={tagCollection}
                                        required="true"
                                        value={tags}
                                        helper="Pin should be associated with at least one tag"
                                        onStateChange={handleTags}/>
                                }
                                { !switchOn &&
                                    <div>
                                    <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                                    Tags
                                    </Typography>
                                    <RenderChips customClass="renderChip" avatar={false} items={tags} />
                                    </div>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                { switchOn &&
                                    <AutocompleteMultiple 
                                        label="Contributors"
                                        user={props.user}
                                        collection={pinboardUsers}
                                        value={contributors}
                                        onStateChange={handleContributors}/>
                                }
                                
                                { !switchOn &&
                                    <div>
                                    <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                                    Contributors
                                    </Typography>
                                    <RenderChips customClass="m-1" avatar={true} items={contributors} />
                                    </div>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                { switchOn &&
                                    <SelectDropDown 
                                        label="Board"
                                        collection={boards}
                                        values={board}
                                        helper="Please choose a board for this pin"
                                        required="true"
                                        value={board}
                                        onStateChange={handleSelectBoard} />
                                }
                                { !switchOn &&
                                    <div>
                                        {board}
                                    </div>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                { switchOn && props.pinObj && props.pinObj.type == "Component" &&
                                    <TextField
                                        id="componentUrl"
                                        name="componentUrl"
                                        label="Component Installer Command"
                                        value={command}
                                        fullWidth
                                        onChange={handleCommand}
                                    />
                                }
                                { !switchOn &&
                                    <div>
                                        {command}
                                    </div>
                                }
                            </Grid>
                            { switchOn && props.pinObj && props.pinObj.type == "Component" &&
                                <Grid item xs={12} sm={12}>
                                    <PinBoardDz />
                                </Grid>
                            }
                        </Grid>
                    </div>
                </React.Fragment>
            </Dialog>
            <div>
                <Dialog open={openBoardForm} onClose={handleCloseBoardForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create a New Board</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Some context information here!
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="boardName"
                                name="boardName"
                                label="Board Name"
                                onChange={handleChangeCreateNewBoard}
                                type="text"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseBoardForm} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSaveCreateNewBoard} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}