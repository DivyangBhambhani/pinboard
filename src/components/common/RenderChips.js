import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({}));

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
                            avatar={props.avatar === true ? <Avatar>{deriveAvatarFromUserDisplayName(item.label)}</Avatar> : null}
                            label={item.label}
                            className={(props && props.customClass) ?  `${classes.chip} ${props.customClass}` : classes.chip}
                        />
                    )
                })
            }
        </div>
    )
}