import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

export default function LogoutButton(props) {
    return (
        <IconButton color="inherit" onClick={props.onClickLogout}>
            <PowerSettingsNewIcon />
        </IconButton>
    )
}  