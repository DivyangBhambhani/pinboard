import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

const suggestions = [
    { id:1, label: 'Manisha Sawlani' },
    { id:2, label: 'Divyang Bhambhani' },
    { id:3, label: 'Mohit Solanki' }
];

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
        InputProps={{
            inputRef: ref,
            classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
            },
            ...InputProps,
        }}
        {...other}
        />
    );
}

function renderSuggestion(suggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}>
        {suggestion.label}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : suggestions.filter(suggestion => {
            const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
            count += 1;
            }

            return keep;
        });
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing(2),
    },
}));

export default function Autocomplete(props) {
    const classes = useStyles();
    const required = props.required === "true" ? ' *' : ''

    return (
        <div className={classes.root}>
            <Downshift id="downshift-simple" onChange={props.onStateChange}>
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                }) => {
                const { onBlur, onFocus, ...inputProps } = getInputProps({
                    placeholder: 'Type Something Here',
                });
                return (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            label: `${props.label}${required}`,
                            InputLabelProps: getLabelProps({ shrink: true }),
                            InputProps: { onBlur, onFocus },
                            inputProps,
                        })}

                        <div {...getMenuProps()}>
                            {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue).map((suggestion, index) =>
                                renderSuggestion({
                                    suggestion,
                                    index,
                                    itemProps: getItemProps({ item: suggestion.label }),
                                    highlightedIndex,
                                    selectedItem,
                                }),
                                )}
                            </Paper>
                            ) : null}
                        </div>
                    </div>
                );
                }}
            </Downshift>
            <FormHelperText>{props.helper}</FormHelperText>            
        </div>
    );
}