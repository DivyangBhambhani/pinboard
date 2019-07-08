import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import BoardIcon from '@material-ui/icons/FolderOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import PinIcon from '@material-ui/icons/BookOutlined';
import Link from '@material-ui/core/Link';

export const mainListItems = (
  <div>
    <Link href="/home">
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
    </Link>
    <Link href="/home">
        <ListItem button>
            <ListItemIcon>
                <BoardIcon />
            </ListItemIcon>
            <ListItemText primary="Boards" />
        </ListItem>
    </Link>
    <Link href="/pins">
        <ListItem button>
            <ListItemIcon>
                <PinIcon />
            </ListItemIcon>
            <ListItemText primary="Pins" />
        </ListItem>
    </Link>
    <Link href="/tags">
        <ListItem button>
            <ListItemIcon>
                <BoardIcon />
            </ListItemIcon>
            <ListItemText primary="Tags" />
        </ListItem>
    </Link>
    <Link href="/home">
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);