import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField'
import Header from '../../common/Header';
import DraftTextEditor from '../../common/DraftTextEditor';
import {getPins} from '../../utils/api';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      },
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
    sidebarAboutBox: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
      marginTop: theme.spacing(3),
    },
    textField: {
        marginRight: theme.spacing(1),
      },
      dense: {
        marginTop: theme.spacing(2),
      },
}));  
  
const pins = getPins()

export default function PinView(props) {
    const classes = useStyles();
    console.log(props.match.params.id)
    // const pin = props.history.location.state.pinDetails
    const pin = pins.map((pin) => {
        if (pin.id === props.match.params.id) {
            console.log(pin)
        }
    })

    return (
        <div>
            <Header props={props}>
                <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <main>
                    {pins.map((pin,index) => {
                        if (pin.id == props.match.params.id) {
                            return(<Grid key={index} container spacing={5} className={classes.mainGrid}>
                                <Grid item xs={12} md={8}>
                                    <Typography className="display-4" variant="h4" gutterBottom>
                                    {pin.pinTitle}
                                    </Typography>
                                    <Divider />
                                    <div>
                                    <DraftTextEditor 
                                        pin={pin}
                                        readOnly={true}
                                        value={pin.pinBody} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    { pin.type == "Component" &&
                                        <Paper elevation={0} className={classes.sidebarAboutBox}>
                                            <Typography variant="h6" gutterBottom>
                                                Use this in your project
                                            </Typography>
                                            <TextField
                                                id="outlined-dense"
                                                label="Installer Command"
                                                fullWidth
                                                readOnly={true}
                                                className={clsx(classes.textField, classes.dense)}
                                                value={pin.command}
                                                margin="dense"
                                                variant="outlined"
                                            />
                                        </Paper>
                                    }
                                    <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                                    Contributors
                                    </Typography>
                                    {
                                        pin.contributors.map((contributor, index)=>{
                                            return(
                                                <Chip
                                                    key={index}
                                                    avatar={<Avatar>MB</Avatar>}
                                                    label={contributor}
                                                    className={classes.chip}
                                                />
                                            )
                                        })
                                    }
                                    
                                    <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                                    Tags
                                    </Typography>
                                    {pin.tags}
                                </Grid>
                            </Grid>)
                        }})}                            
                    </main>
                </Container>
                </main>
            </Header>    
        </div>
    );
}