import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../../common/Header';
import {getTags, addTag, editTag, deleteTag} from '../../utils/api';
import MaterialTable from 'material-table';
import { SnackbarProvider, useSnackbar } from 'notistack';

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

function Tags(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();  
    
    const handleClickVariant = (message, variant) => () => {
        enqueueSnackbar(message, {
            variant, 
            autoHideDuration: 3000
        });
    };
    
    const [state, setState] = React.useState({
        columns: [
            { 
                title: 'Name', 
                field: 'name'
            }
        ],
        data: []
    });

    useEffect(() => {
        getTags().then((result) => {
            let newState = {...state, data: result.data}
            setState(newState)
        })
    }, [])
    
    return (
        <div>
            <Header props={props}>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        
                    <MaterialTable
                        title="Tags"
                        columns={state.columns}
                        data={state.data}
                        options={{
                            actionsColumnIndex: -1
                        }}
                        editable={{
                        onRowAdd: newData => {
                            return addTag(newData).then((result) => {
                                if (result.status) {
                                    const data = [...state.data];
                                    let newData = data.concat(result.data);
                                    setState({ ...state, data:newData });
                                    handleClickVariant(result.message, 'success')()
                                } else {
                                    handleClickVariant(result.message, 'error')()
                                }
                            });
                        },
                        onRowUpdate: (newData, oldData) => {
                            return editTag(newData).then((result) => {
                                if (result.status) {
                                    const data = [...state.data];
                                    data[data.indexOf(oldData)] = newData;
                                    setState({ ...state, data });
                                    handleClickVariant(result.message, 'success')()
                                } else {
                                    handleClickVariant(result.message, 'error')()
                                }
                            });   
                        },
                        onRowDelete: oldData => {
                            return deleteTag(oldData).then((result) => {
                                if (result.status) {
                                    const data = [...state.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    setState({ ...state, data });
                                    handleClickVariant(result.message, 'success')()
                                } else {
                                    handleClickVariant(result.message, 'error')()
                                }
                            });
                        }
                    }}
                    />
                    </Container>
                </main>
            </Header>
        </div>
    );
}

export default function WithNotistack() {
    return (
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right'}} maxSnack={3}>
        <Tags />
      </SnackbarProvider>
    );
}