import React from 'react';
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
import DraftTextEditor from './common/DraftTextEditor';
import AutocompleteMultiple from './common/AutocompleteMultiple';
import Autocomplete from './common/Autocomplete';
import SelectDropDown from './common/SelectDropDown';

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

export default function PinFormDrawer(props) {
    const classes = useStyles();

    const [owner, setOwner] = React.useState(null);
    const [contributors, setContributors] = React.useState(null);
    const [tags, setTags] = React.useState(null);
    const [pinTitle, setPinTitle] = React.useState(null);
    const [board, setBoard] = React.useState(null);
    const [pinBody, setPinBody] = React.useState(null);
    
    const pinboardUsers = [
        { id:1, label: 'Manisha Sawlani' },
        { id:2, label: 'Divyang Bhambhani' },
        { id:3, label: 'Mohit Solanki' }
    ];
    const tagCollection = [
        { id:1, label: 'React'},
        { id:2, label: 'JS' },
        { id:3, label: 'PHP' }
    ]
    const boards = [
        {value: 1, label:'React Knowledgebase'},
        {value: 2, label:'LAMP Team'},
        {value: 3, label:'Java Team'},
    ]
    
    const handleOwner = (selectedItem) => {
        console.log(selectedItem,'ownerpinformdrawer')
        setOwner(selectedItem.inputValue)
    }

    const handlePinTitle = (e) => {
        setPinTitle(e.target.value)
    }

    const handleTags = (selectedItem) => {
        console.log(selectedItem,'tags')
        setTags(selectedItem.inputValue)
    }

    const handleContributors = (selectedItem) => {
        setContributors(selectedItem.inputValue)
    }

    const handleSelectBoard = (value) => {
        setBoard(value)
    }

    const handlePinBody = (value) => {
        setPinBody(value)
    }

    const handleSavePin = () => {
        console.log(owner, contributors, tags, pinTitle,board,'state')
        console.group()
        console.log(pinBody,'pinbody')
        console.groupEnd()
        localStorage.setItem('pin',JSON.stringify({
            pinTitle,
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
                        {`Add ${props.pinType}`}
                        </Typography>
                        <Button color="inherit" onClick={handleSavePin}>
                        save
                        </Button>
                    </Toolbar>
                </AppBar>
                <React.Fragment>
                    <div className={classes.layout}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            <TextField
                                required
                                id="pinTitle"
                                name="pinTitle"
                                label="Pin Title"
                                value={props.pinObj ? props.pinObj.pinTitle : ''}
                                fullWidth
                                onChange={handlePinTitle}
                            />
                            </Grid>
                            <Grid item xs={12}>
                                <DraftTextEditor 
                                    onStateChange={handlePinBody} 
                                    value={props.pinObj ? props.pinObj.pinBody : ''} />
                            </Grid>
                            <Grid item xs={12}>
                                <AutocompleteMultiple 
                                    label="Tags" 
                                    user={props.user}
                                    collection={tagCollection}
                                    required="true"
                                    value={props.pinObj ? props.pinObj.tags : ''}
                                    helper="Pin should be associated with at least one tag"
                                    onStateChange={handleTags}/>
                            </Grid>
                            <Grid item xs={12}>
                                <AutocompleteMultiple 
                                    label="Contributors"
                                    collection={pinboardUsers}
                                    user={props.user}
                                    value={props.pinObj ? props.pinObj.contributors : ''}
                                    onStateChange={handleContributors}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete 
                                    label="Owner"
                                    collection={pinboardUsers}
                                    user={props.user}
                                    value={props.pinObj ? props.pinObj.owner : ''}
                                    required="true"
                                    onStateChange={handleOwner}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectDropDown 
                                    label="Board"
                                    collection={boards}
                                    values={board}
                                    helper="Please choose a board for this pin"
                                    required="true"
                                    value={props.pinObj ? props.pinObj.board : ''}
                                    onStateChange={handleSelectBoard} />
                            </Grid>
                        </Grid>
                    </div>
                </React.Fragment>
            </Dialog>
        </div>
    );
}