import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { withRouter } from "react-router";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  cardMedia: {
    padding: `40px`,
    background: `#f9f7f7`
  },
  mlauto: {
      marginLeft: 'auto'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

function ImgMediaCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    const handleDrawerClick = () => {
        if (props && props.type != "smartAction") {
            props.history.push({
                pathname: `/pins/${props.pinObj.id}`
            })
        } else {
            props.openDrawer(props.pinObj,"view")
        }
    }

    return (
        <div onClick={props.onClickDrawerAction}>
            <Card className={classes.card}>
                <CardActionArea onClick={handleDrawerClick} >
                    <CardMedia
                        className={classes.cardMedia}
                        component="img"
                        title={(props.pinObj && props.pinObj.pinTitle) ? props.pinObj.pinTitle : 'No Title Available'}
                        height="140"
                        image={props ? props.img : 'img/no-image.png'}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="subtitle2" component="h2">
                            {props.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                
                { props && props.user && props.pinObj &&
                    <CardActions disableSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon fontSize="small" />
                        </IconButton>
                        
                        {(props.user.displayName == props.pinObj.owner) &&
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="Show more"
                                >
                                <ExpandMoreIcon fontSize="small"/>
                            </IconButton>
                        }
                    </CardActions>
                }
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Button onClick={() => props.openDrawer(props.pinObj,"edit")} size="small">Edit</Button>
                        <Button size="small">Delete</Button>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default withRouter(ImgMediaCard);
