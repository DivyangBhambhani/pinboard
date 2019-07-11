import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
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
import Autocomplete from '../../common/Autocomplete';
import SelectDropDown from '../../common/SelectDropDown';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getUsers, getTags, getBoards} from  '../../utils/api';
import EditViewSwitch from '../../common/EditViewSwitch';
import PinBoardDz from '../../common/PinBoardDz';
import {addPin} from "../../actions/index";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color:'#ffffff'
  },
  layout: {
    width: 'auto',
    marginTop: '20px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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

function mapDispatchToProps(dispatch) {
    return {
        addPin: pin => dispatch(addPin(pin))   
    };
}

const pinboardUsers = getUsers()
const boards = getBoards()
const tagCollection = getTags()


const PinFormDrawer = (props) => {
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
        if(value == 0) {
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
        props.addPin(JSON.stringify({
            pinTitle,
            type: props.pinObj ? props.pinObj.type : '',
            pinBody,
            tags,
            contributors,
            owner,
            board
        }))
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
    }

    return (
        <div>
            <Dialog fullScreen open={props.openPinDrawer} onClose={props.onClickDrawerClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.onClickDrawerClose} aria-label="Close">
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
                                        {tags}
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
                                        {contributors}
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
                                { switchOn &&
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
                            { switchOn &&
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
export default connect(null, mapDispatchToProps)(PinFormDrawer);