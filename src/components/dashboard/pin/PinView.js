import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField'
import Header from '../../common/Header';
import DraftTextEditor from '../../common/DraftTextEditor';
import {getPins, getBoardById} from '../../utils/api';
import RenderChips from '../../common/RenderChips';
import PinPublishInfo from './PinPublishInfo';

const useStyles = makeStyles(theme => ({
    root:{
        marginTop:'10px !important',
        marginBottom:'10px !important'
    },
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
        boxShadow: '0 0 10px 0 #e0e0e0',
        background: '#fff !important'
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
    return (
        <div>
            <Header props={props}>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                    <main>
                    {pins.map((pin,index) => {
                        if (pin.id == props.match.params.id) {
                            return(
                                <Grid key={index} container spacing={5} className={classes.mainGrid}>
                                    <Grid className="bg-white pt-5 height-full-screen" item xs={12} md={8}>
                                        <Typography className="display-4" variant="h3" gutterBottom>
                                        {pin.pinTitle}
                                        </Typography>
                                        <PinPublishInfo updatedDate={pin.updatedDate} board={getBoardById(pin.board)} views="100"/>
                                        <Divider classes={{root: classes.root}} />
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
                                        <RenderChips customClass="m-1" avatar={true} items={pin.contributors} />
                                        
                                        
                                        <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                                        Tags
                                        </Typography>
                                        <RenderChips customClass="renderChip" avatar={false} items={pin.tags} />
                                    </Grid>
                                </Grid>
                            )
                        }})}                            
                    </main>
                </Container>
                </main>
            </Header>    
        </div>
    );
}