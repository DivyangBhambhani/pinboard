import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateIcon from '@material-ui/icons/DateRange';
import BoardIcon from '@material-ui/icons/DeveloperBoard';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  txt: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    boxShadow: 'none'
  },
  icon:{
      color:'#3f51b5'
  }
}));

const dateDiff = (date) => {
    let updateDate = new Date(date);
    let today = new Date();
    const diffTime = Math.abs(today.getTime() - updateDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let diff = ''
    diff = (diffDays < 30) ? `${diffDays} ${diffDays > 1 ? 'Days' : 'Day'}` : 
                (diffDays > 30 && diffDays < 365) ? `${Math.floor(diffDays / 30)} ${Math.floor(diffDays / 30) > 1 ? 'Months' : 'Month'}` : 
                    (diffDays > 365) ? `${Math.floor(diffDays / 365)} ${Math.floor(diffDays / 365) > 1 ? 'Years' : 'Year'}` : 'Some Time'

    return diff;
}

export default function PinPublishInfo(props) {
    const classes = useStyles();
    let diff = dateDiff(parseInt(props.updatedDate))
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="subtitle2" color="textSecondary">
                        <ViewIcon className={classes.icon} /> {props.views} Views
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="subtitle2" color="textSecondary">
                        <BoardIcon className={classes.icon} /> {props.board}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="subtitle2" color="textSecondary">
                        <DateIcon className={classes.icon} /> {diff} Ago
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}