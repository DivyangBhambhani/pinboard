import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PinFormDrawer from '../PinFormDrawer';
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
    const [type, setType] = useState(null)
    const [pinFormDrawer, setPinFormDrawer] = useState(false)
    
    const openPinDrawerForm = (type) => {
        setType(type)
        setPinFormDrawer(true)
    }
    
    const closePinDrawerForm = () => {
        setType(null)
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
                                onClickDrawerAction={() => openPinDrawerForm("Code Snippet")} 
                                img="/img/code.png"
                                title="Pin a Code Snippet">
                            </ImgMediaCard>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <ImgMediaCard 
                                onClickDrawerAction={() => openPinDrawerForm("Component")} 
                                img="/img/component.png"
                                title="Pin a Component">
                            </ImgMediaCard>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <ImgMediaCard 
                                onClickDrawerAction={() => openPinDrawerForm("Task List")} 
                                img="/img/task.png"
                                title="Pin a Task List">
                            </ImgMediaCard>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <ImgMediaCard 
                                onClickDrawerAction={() => openPinDrawerForm("Notes")} 
                                img="/img/notes.png"
                                title="Pin a Note">
                            </ImgMediaCard>
                        </Grid>
                    </Grid>
                    <PinFormDrawer 
                        openPinDrawer={pinFormDrawer}
                        pinType={type}
                        onClickDrawerAction={openPinDrawerForm} 
                        onClickDrawerClose={closePinDrawerForm}
                        user={props.user}
                    />
                </Container>
            </main>
        </Header>
        </div>
    );
}

