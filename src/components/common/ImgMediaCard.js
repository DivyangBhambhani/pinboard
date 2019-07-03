import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  cardMedia: {
    padding: `40px`,
    background: `#f9f7f7`
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  return (
    <div onClick={props.onClickDrawerAction}>
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={props.img || 'img/no-image.png'}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle2" component="h2">
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={2}>
                    {props.actions && 
                        <CardActions>
                            <Button onClick={() => props.openDrawer(props.pinObj,"edit")} size="small">Edit</Button>
                            <Button size="small">Delete</Button>
                        </CardActions>
                    }
                </Grid>
            </Grid>
        </Card>
    </div>
  );
}