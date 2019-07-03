import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectDropDown(props) {
    const classes = useStyles();
    const options = props.collection
    const id = props.label.toLowerCase();
    
    const selectState = {}
    selectState[id] = ''
    const [values, setValues] = React.useState(selectState);
    
    const required = props.required === "true" ? ' *' : ''
    
    function handleChange(event) {
        setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
        }));
        props.onStateChange(event.target.value)
    }
    return (
        <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={`${id}-helper`}>{`${props.label}${required}`}</InputLabel>
                <Select
                    value={props.value ? props.value : values[id]}
                    onChange={handleChange}
                    input={<Input name={`${id}`} id={`${id}-helper`} />}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {
                    options.map((option, index) => {
                        return (
                            <MenuItem 
                                key={index}
                                value={option.value}>
                            {option.label}
                            </MenuItem>
                        )
                    })
                }
                </Select>
                <FormHelperText>{props.helper}</FormHelperText>
            </FormControl>
        </form>
    );
}