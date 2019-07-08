import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../../common/Header';
import {getTags, addTags} from '../../utils/api';
import MaterialTable from 'material-table';

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

export default function Tags(props) {
    let data = [];

    const classes = useStyles();
    const [state, setState] = React.useState({
    columns: [
        {
            title: 'Id',
            field: 'id',
            hidden: true 
        },
        { 
            title: 'Name', 
            field: 'name'
        }
    ],
    data: [
    ]
  });

  return (
    <div>
        <Header props={props}>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    
                  <MaterialTable
                    title="Editable Example"
                    columns={state.columns}
                    data={query => 
                      
                      getTags().then((result) => {
                        return ({
                                data: result[0].data,
                                page:  1,
                                totalCount: 11,
                              })
                        })
                    }
                    editable={{
                      onRowAdd: newData => {
                        return addTags(newData).then((result) => {
                            const data = [...state.data];
                            data.push(newData);
                            setState({ ...state, data });
                        });
                      },
                      onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            setState({ ...state, data });
                          }, 600);
                        }),
                      onRowDelete: oldData =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.splice(data.indexOf(oldData), 1);
                            setState({ ...state, data });
                          }, 600);
                        }),
                    }}
                  />
                </Container>
            </main>
        </Header>
    </div>
  );
}
