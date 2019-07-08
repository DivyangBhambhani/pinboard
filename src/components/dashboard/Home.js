import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PinFormDrawer from './pin/PinFormDrawer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ImgMediaCard from '../common/ImgMediaCard'
import Header from '../common/Header';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

export default function Dashboard(props) {
    const classes = useStyles();
    const [pin, setPin] = useState(null)
    const [pinFormDrawer, setPinFormDrawer] = useState(false)
    
    const openPinDrawerForm = (pin) => {
        setPin(pin)
        setPinFormDrawer(true)
    }
    
    const closePinDrawerForm = () => {
        setPin(null)
        setPinFormDrawer(false)
    }

    if (props.isAuthed === false ) {
        this.logout();
        props.history.push('/login');
    }

    return (
        <div>
        <Header props={props}>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} lg={2}>
                            <ImgMediaCard 
                                openDrawer={() => openPinDrawerForm({type: "Code Snippet"})} 
                                img="/img/code.png"
                                user={props.user}
                                title="Pin a Code Snippet"
                                type="smartAction">
                            </ImgMediaCard>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <ImgMediaCard 
                                openDrawer={() => openPinDrawerForm({type: "Component"})} 
                                img="/img/component.png"
                                user={props.user}
                                title="Pin a Component"
                                type="smartAction">
                            </ImgMediaCard>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <ImgMediaCard 
                                openDrawer={() => openPinDrawerForm({type: "Task List"})} 
                                img="/img/task.png"
                                user={props.user}
                                title="Pin a Task List"
                                type="smartAction">
                            </ImgMediaCard>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <ImgMediaCard 
                                openDrawer={() => openPinDrawerForm({type: "Notes"})} 
                                img="/img/notes.png"
                                user={props.user}
                                title="Pin a Note"
                                type="smartAction">
                            </ImgMediaCard>
                        </Grid>
                    </Grid>
                    <PinFormDrawer 
                        openPinDrawer={pinFormDrawer}
                        pinObj={pin}
                        mode="add"
                        openDrawer={openPinDrawerForm} 
                        onClickDrawerClose={closePinDrawerForm}
                        user={props.user}
                    />
                </Container>
            </main>
        </Header>
        </div>
    );
}

