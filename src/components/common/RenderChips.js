import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    themeAvatar: {
        background: '#fff !important',
        border: 'solid 1px #3f51b5 !important'
    }
}));

function deriveAvatarFromUserDisplayName(displayName) {
    return displayName.match(/\b(\w)/g).join('')
}

export default function RenderChips(props) {
    const classes = useStyles();
    return (
        <div>
            {
                props.items.map((item, index)=>{
                    return(
                        <Chip
                            key={index}
                            classes={{avatar: classes.themeAvatar}}
                            avatar={props.avatar === true ? <Avatar>{deriveAvatarFromUserDisplayName(item.label)}</Avatar> : null}
                            label={item.label}
                            className={(props && props.customClass) ?  `${classes.chip} ${props.customClass}` : `${classes.chip}`}
                        />
                    )
                })
            }
        </div>
    )
}