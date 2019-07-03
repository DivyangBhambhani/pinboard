import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ImgMediaCard from './common/ImgMediaCard'
import Header from './common/Header';
import PinFormDrawer from './PinFormDrawer';

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

const pins = [
    {
        "id":"id1",
        "type":"Code Snippet",
        "pinTitle":"Title",
        "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
        "tags":"React",
        "contributors":"Divyang Bhambhani",
        "owner":"Divyang Bhambhani",
        "board":1
    },{
        "id":"id2",
        "type":"Code Snippet",
        "pinTitle":"Title",
        "pinBody":"<p>&nbsp;</p>\n<pre><code>const handlePinBody = (value) =&gt; {<br>\n setPinBody(value)<br>\n &nbsp;&nbsp;&nbsp;}</code></pre>",
        "tags":"React",
        "contributors":"Divyang Bhambhani",
        "owner":"Divyang Bhambhani",
        "board":1
    }]

export default function Pins(props) {
    const classes = useStyles();
    const [pin, setPin] = useState(null)
    const [mode, setMode] = useState(null)
    const [pinFormDrawer, setPinFormDrawer] = useState(false)
    
    const openPinDrawerForm = (pin, mode) => {
        setPin(pin)
        setMode(mode)
        setPinFormDrawer(true)
    }
    
    const closePinDrawerForm = () => {
        setPin(null)
        setMode(null)
        setPinFormDrawer(false)
    }

    return (
        <div>
            <Header props={props}>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {
                                pins.map((pin, index) => {
                                    return (
                                        <Grid item xs={12} sm={6} lg={2} key={index}>
                                            <ImgMediaCard
                                                actions={true}
                                                img={'/img/coding.png'}
                                                pinObj={pin}
                                                openDrawer={openPinDrawerForm}
                                                title={pin.pinTitle}>
                                            </ImgMediaCard>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        <PinFormDrawer 
                            openPinDrawer={pinFormDrawer}
                            pinObj={pin}
                            mode="edit"
                            onClickDrawerAction={openPinDrawerForm} 
                            onClickDrawerClose={closePinDrawerForm}
                            user={props.user}
                        />
                    </Container>
                </main>
            </Header>
        </div>
    )
}